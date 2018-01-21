package com.eucalypt.lz.commons.services;

import com.eucalypt.framework.core.entity.*;
import com.eucalypt.framework.core.exception.MessageException;
import com.eucalypt.framework.core.security.UserAuthenticationService;
import com.eucalypt.framework.core.service.AbstractUsersService;
import com.eucalypt.framework.core.service.FileEntityService;
import com.eucalypt.framework.weixin.entity.WeixinUserInfoBean;
import com.eucalypt.framework.weixin.service.WeixinDataService;
import com.eucalypt.framework.weixin.service.WeixinDataServiceFactory;
import com.eucalypt.lz.commons.beans.SHLoginBean;
import com.eucalypt.lz.commons.beans.User;
import org.mongodb.morphia.query.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.URL;

/**
 * Created by zhaoyang on 17/5/7.
 */
@Service
public class UserService extends AbstractUsersService<User> implements UserAuthenticationService {

	private static final Logger logger = LoggerFactory.getLogger(UserService.class);
	private static final ModuleRealm[] realms = {ModuleRealm.WORK};

	@Autowired
	private FileEntityService fileEntityService;

	@Autowired
	private WeixinDataServiceFactory weixinDataServiceFactory;

	@Autowired(required = false)
	private SMSService smsService;

	@Override
	protected Class<User> getEntityClass() {
		return User.class;
	}

	@Override
	public User get(String id) {
		return super.get(id);
	}

	public PagedResults<User> listPaged(PagedParam pagedParam) {
		return super.listPaged(pagedParam);
	}

	@Override
	public String save(User entity) {
		return super.save(entity);
	}

	@Override
	public String create(User user) throws MessageException {
		user.setUsername(user.getOpenId());
		user.setPassword(user.getOpenId());
		try {
			WeixinDataService weixinDataService = (WeixinDataService) weixinDataServiceFactory.getWeixinDataService();
			WeixinUserInfoBean userInfo = weixinDataService.fetchUserInfo(user.getOpenId(), weixinDataService.getToken());
			if (userInfo != null) {
				user.setNickname(userInfo.getNickname());
				if (userInfo.getHeadimgurl() != null) {
					if (user.getHeader() != null) {
						fileEntityService.delete(user.getHeader());
					}
					FileEntity fileEntity = new FileEntity();
					fileEntity.setInputStream(new URL(userInfo.getHeadimgurl()).openStream());
					String fileId = fileEntityService.save(fileEntity);
					user.setHeader(fileId);
				}
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return super.create(user);
	}

	@Override
	public void delete(String id) {
		super.delete(id);
	}

	public User getByOpenId(String openId) {
		return createQuery().field("openId").equal(openId).get();
	}

	public void setPhone(String openId, String phone, String code) {
		if (smsService.verifySMSCode(phone, code)) {
			if (createQuery().field("phone").equal(phone).count() > 0) {
				throw new MessageException("该手机号已经被另一个账号绑定，请更换手机重新绑定");
			}
			User user = getByOpenId(openId);
			if (user != null) {
				user.setPhone(phone);
			}
			super.save(user);
		}
	}

	@Override
	public User auth(LoginBean loginBean) {
		Query<User> query;
		SHLoginBean shLoginBean = (SHLoginBean) loginBean;
		if (shLoginBean.getOpenId() != null) {
			query = createQuery().field("openId").equal(shLoginBean.getOpenId());
		} else {
			if (shLoginBean.isCheckCode() && shLoginBean.getCode() != null && !smsService.verifySMSCode(shLoginBean.getUsername(), shLoginBean.getCode())) {
				throw new MessageException("验证码不正确");
			}
			query = createQuery().field("username").equal(shLoginBean.getUsername());
		}
		User user = query.get();
		if (user == null) {
			return null;
		}
		return user;
	}

	@Override
	public ModuleRealm[] getRealms() {
		return realms;
	}

	@Override
	public User loadUser(String id) {
		return get(id);
	}

	public boolean has(SHLoginBean loginBean) {
		return createQuery().field("openId").equal(loginBean.getOpenId()).count() > 0;
	}
}
