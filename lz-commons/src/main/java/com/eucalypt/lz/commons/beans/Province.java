package com.eucalypt.lz.commons.beans;

import com.eucalypt.framework.core.entity.AbstractEntity;
import org.mongodb.morphia.annotations.Entity;

@Entity(value = "provinces")
public class Province extends AbstractEntity {

	private String code;
	private String iscity;
	private String level;
	private String name;
	private String parentCode;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getIscity() {
		return iscity;
	}

	public void setIscity(String iscity) {
		this.iscity = iscity;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public String getParentCode() {
		return parentCode;
	}
	
	public void setParentCode(String parentCode) {
		this.parentCode = parentCode;
	}

}
