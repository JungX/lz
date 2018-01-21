package com.eucalypt.lz.commons.beans;

import com.eucalypt.framework.core.entity.LoginBean;

public class SHLoginBean extends LoginBean {
	private String wxCode;
	private String openId;
	private String referrer;
	private boolean checkCode = true;

	public String getWxCode() {
		return wxCode;
	}

	public void setWxCode(String wxCode) {
		this.wxCode = wxCode;
	}

	public String getOpenId() {
		return openId;
	}

	public void setOpenId(String openId) {
		this.openId = openId;
	}

	public String getReferrer() {
		return referrer;
	}

	public void setReferrer(String referrer) {
		this.referrer = referrer;
	}

	public boolean isCheckCode() {
		return checkCode;
	}

	public void setCheckCode(boolean checkCode) {
		this.checkCode = checkCode;
	}
}
