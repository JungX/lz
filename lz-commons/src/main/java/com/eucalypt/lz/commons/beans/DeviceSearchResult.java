package com.eucalypt.lz.commons.beans;

public class DeviceSearchResult {
	private String id;
	private String number;
	private double distance;
	private Double[] coordinates;
	private String shopId;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public double getDistance() {
		return distance;
	}

	public void setDistance(double distance) {
		this.distance = distance;
	}

	public Double[] getCoordinates() {
		return coordinates;
	}

	public void setCoordinates(Double[] coordinates) {
		this.coordinates = coordinates;
	}

	public String getShopId() {
		return shopId;
	}

	public void setShopId(String shopId) {
		this.shopId = shopId;
	}
}
