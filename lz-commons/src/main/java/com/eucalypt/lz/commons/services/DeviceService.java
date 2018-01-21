package com.eucalypt.lz.commons.services;

import com.eucalypt.framework.core.entity.PagedParam;
import com.eucalypt.framework.core.entity.PagedResults;
import com.eucalypt.framework.core.service.AbstractService;
import com.eucalypt.lz.commons.beans.Device;
import com.eucalypt.lz.commons.beans.DeviceSearchResult;
import com.eucalypt.lz.commons.enums.DeviceRunType;
import com.eucalypt.lz.commons.enums.OrderType;
import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import net.glxn.qrgen.QRCode;
import net.glxn.qrgen.image.ImageType;
import net.sf.json.JSONObject;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.mongodb.morphia.query.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.OutputStream;
import java.text.MessageFormat;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class DeviceService extends AbstractService<Device> {

	private static final Logger logger = LoggerFactory.getLogger(DeviceService.class);
	private static final String devicePayTemplate = "http://www.lz365golf.com/server/?deviceId={0}&type={1}";
	private static final int QR_WIDTH = 350;
	private static final int QR_HEIGHT = 350;
	private static final int MAX_NUMBER = 99999999;
	private static final int MIN_NUMBER = 1;

	private static final String broker = "tcp://211.159.164.88:1883";

	@Autowired
	private ShopService shopService;

	@Override
	protected Class<Device> getEntityClass() {
		return Device.class;
	}

	@Override
	public String save(Device entity) {
		if (entity.isCreate()) {
			entity.setNumber(generateNumber());
		}
		if (entity.getShopId() != null) {
			entity.setShop(shopService.get(entity.getShopId()));
		}
		return super.save(entity);
	}

	@Override
	public PagedResults<Device> listPaged(PagedParam pagedParam) {
		return super.listPaged(pagedParam);
	}

	@Override
	public void delete(String id) {
		super.delete(id);
	}

	@Override
	public Device get(String id) {
		return super.get(id);
	}

	private String generateNumber() {
		while (true) {
			String number = Integer.toString(ThreadLocalRandom.current().nextInt(MIN_NUMBER, MAX_NUMBER));
			if (number.length() != 8) {
				continue;
			}
			long count = createQuery().field("number").equal(number).count();
			if (count == 0) {
				return number;
			}
		}
	}

	public void send(String deviceId, int mins, DeviceRunType type, String transactionalId) {
		String topic = deviceId;
		int qos = 0;
		String clientId = deviceId;
		String userName = "test";
		String password = "test";
		MemoryPersistence persistence = new MemoryPersistence();
		MqttClient sampleClient = null;
		try {
			logger.info("sending message");
			sampleClient = new MqttClient(broker, clientId, persistence);
			MqttConnectOptions connOpts = new MqttConnectOptions();
			connOpts.setCleanSession(true);
			connOpts.setUserName(userName);
			connOpts.setPassword(password.toCharArray());
			sampleClient.connect(connOpts);
			JSONObject jo = new JSONObject();
			jo.put("machineId", deviceId);
			jo.put("type", type.name());
			jo.put("timeLimit", mins);
			jo.put("transactionalId", transactionalId);
			MqttMessage message = new MqttMessage(jo.toString().getBytes());
			message.setQos(qos);
			sampleClient.publish(topic, message);
			logger.info("Send message:" + jo.toString());
		} catch (MqttException me) {
			logger.error(me.getMessage(), me);
		} finally {
			if (sampleClient != null) {
				try {
					sampleClient.disconnect();
				} catch (MqttException e) {
					logger.error(e.getMessage(), e);
				}
			}
		}
	}

	public void setLocation(String id, Double[] coordinates) {
		super.update(id, "coordinates", coordinates);
	}

	public Collection<DeviceSearchResult> listNearDevices(Double[] coordinates) {
		Query<Device> query = createQuery();
		BasicDBObject geoNearQuery = new BasicDBObject();
		geoNearQuery.put("geoNear", "devices");
		geoNearQuery.put("near", coordinates);
		if (query != null) {
			geoNearQuery.put("query", query.getQueryObject());
		}
		geoNearQuery.put("distanceMultiplier", 111);
		geoNearQuery.put("maxDistance", 20 / 111.12);

		Map map = getDatastore().getDB().command(geoNearQuery).toMap();
		Map<String, DeviceSearchResult> results = new LinkedHashMap<>();
		if (map != null && !map.isEmpty() && map.containsKey("results")) {
			BasicDBList basicDBList = (BasicDBList) map.get("results");
			for (Object aBasicDBList : basicDBList) {
				BasicDBObject basicDBObject = (BasicDBObject) aBasicDBList;
				BasicDBObject obj = (BasicDBObject) basicDBObject.get("obj");
				DeviceSearchResult searchResult = new DeviceSearchResult();
				searchResult.setId(obj.getString("_id"));
				searchResult.setNumber(obj.getString("number"));
				BasicDBList coordinatesObj = (BasicDBList) obj.get("coordinates");
				searchResult.setCoordinates(new Double[]{(Double) coordinatesObj.get(0), (Double) coordinatesObj.get(1)});
				searchResult.setDistance(basicDBObject.getDouble("dis"));
				searchResult.setShopId(obj.getString("shopId"));
				results.put(obj.getString("_id"), searchResult);
			}
			return results.values();
		} else {
			return null;
		}
	}

	public void generateQRCode(String deviceId, OrderType orderType, OutputStream outputStream) {
		if (deviceId.indexOf("\"") > -1) {
			deviceId = deviceId.replaceAll("\"", "");
		}
		String payLink = MessageFormat.format(devicePayTemplate, deviceId, orderType.name());
		QRCode.from(payLink).withCharset("UTF-8").to(ImageType.PNG).withSize(QR_WIDTH, QR_HEIGHT).writeTo(outputStream);
	}
}
