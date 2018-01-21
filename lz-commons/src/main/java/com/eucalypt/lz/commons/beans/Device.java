package com.eucalypt.lz.commons.beans;

import com.eucalypt.framework.core.entity.AbstractEntity;
import com.eucalypt.lz.commons.enums.DeviceStatus;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Indexed;
import org.mongodb.morphia.annotations.NotSaved;
import org.mongodb.morphia.annotations.Reference;
import org.mongodb.morphia.utils.IndexDirection;

import java.util.Date;

@Entity("devices")
public class Device extends AbstractEntity {
	private String number;
	@Indexed(IndexDirection.GEO2D)
	private Double[] coordinates;
	private Date productionTime;
	private String version;
	private DeviceStatus status = DeviceStatus.disconnection;
	private String shopId;
	@Reference
	private Shop shop;

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public Double[] getCoordinates() {
		return coordinates;
	}

	public void setCoordinates(Double[] coordinates) {
		this.coordinates = coordinates;
	}

	public Date getProductionTime() {
		return productionTime;
	}

	public void setProductionTime(Date productionTime) {
		this.productionTime = productionTime;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public DeviceStatus getStatus() {
		return status;
	}

	public void setStatus(DeviceStatus status) {
		this.status = status;
	}

	public String getShopId() {
		return shopId;
	}

	public void setShopId(String shopId) {
		this.shopId = shopId;
	}

	public Shop getShop() {
		return shop;
	}

	public void setShop(Shop shop) {
		this.shop = shop;
	}
}
