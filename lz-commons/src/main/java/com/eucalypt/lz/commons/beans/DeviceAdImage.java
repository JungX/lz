package com.eucalypt.lz.commons.beans;

import com.eucalypt.framework.core.entity.AbstractEntity;
import org.mongodb.morphia.annotations.Entity;

@Entity("device_ad_images")
public class DeviceAdImage extends AbstractEntity {
	private String imageId;

	public String getImageId() {
		return imageId;
	}

	public void setImageId(String imageId) {
		this.imageId = imageId;
	}
}
