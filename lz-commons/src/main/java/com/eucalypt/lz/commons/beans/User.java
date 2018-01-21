package com.eucalypt.lz.commons.beans;

import com.eucalypt.framework.core.entity.ModuleRealm;
import com.eucalypt.lz.commons.enums.Roles;

/**
 * Created by zhaoyang on 17/5/7.
 */
public class User extends BaseUser {

	private String phone;
	private String nickname;
	private Province province;
	private Province city;
	private Province area;
	private String header;
	private String sex;
	private String sign;
	private String openId;
	private String realName;
	private String address;

	public User() {
		super(Roles.user);
		setRealms(new ModuleRealm[]{ModuleRealm.WORK});
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public Province getProvince() {
		return province;
	}

	public void setProvince(Province province) {
		this.province = province;
	}

	public Province getCity() {
		return city;
	}

	public void setCity(Province city) {
		this.city = city;
	}

	public Province getArea() {
		return area;
	}

	public void setArea(Province area) {
		this.area = area;
	}

	public String getHeader() {
		return header;
	}

	public void setHeader(String header) {
		this.header = header;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getSign() {
		return sign;
	}

	public void setSign(String sign) {
		this.sign = sign;
	}

	public String getOpenId() {
		return openId;
	}

	public void setOpenId(String openId) {
		this.openId = openId;
	}

	public String getRealName() {
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

}
