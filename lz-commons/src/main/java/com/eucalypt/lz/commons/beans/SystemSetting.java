package com.eucalypt.lz.commons.beans;

import com.eucalypt.framework.core.entity.AbstractEntity;
import org.mongodb.morphia.annotations.Entity;

/**
 * Created by zhaoyang on 17/7/2.
 */
@Entity("sys_settings")
public class SystemSetting extends AbstractEntity {
	private String weixinWelcomeWord;

	public String getWeixinWelcomeWord() {
		return weixinWelcomeWord;
	}

	public void setWeixinWelcomeWord(String weixinWelcomeWord) {
		this.weixinWelcomeWord = weixinWelcomeWord;
	}
}
