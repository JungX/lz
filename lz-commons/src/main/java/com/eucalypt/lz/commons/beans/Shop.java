package com.eucalypt.lz.commons.beans;

import com.eucalypt.framework.core.entity.AbstractEntity;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Indexed;
import org.mongodb.morphia.utils.IndexDirection;

@Entity("shops")
public class Shop extends AbstractEntity {
	private String name;
	private String address;
	private String logoImage;
	private String coverImage;
	@Indexed(IndexDirection.GEO2D)
	private Double[] coordinates;
	private Province province;
	private Province city;
	private Province area;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getLogoImage() {
		return logoImage;
	}

	public void setLogoImage(String logoImage) {
		this.logoImage = logoImage;
	}

	public String getCoverImage() {
		return coverImage;
	}

	public void setCoverImage(String coverImage) {
		this.coverImage = coverImage;
	}

	public Double[] getCoordinates() {
		return coordinates;
	}

	public void setCoordinates(Double[] coordinates) {
		this.coordinates = coordinates;
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
}
