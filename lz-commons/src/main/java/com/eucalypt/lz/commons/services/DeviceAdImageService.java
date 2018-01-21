package com.eucalypt.lz.commons.services;

import com.eucalypt.framework.core.entity.PagedParam;
import com.eucalypt.framework.core.entity.PagedResults;
import com.eucalypt.framework.core.service.AbstractService;
import com.eucalypt.framework.core.service.FileEntityService;
import com.eucalypt.lz.commons.beans.DeviceAdImage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeviceAdImageService extends AbstractService<DeviceAdImage> {

	@Autowired
	private FileEntityService fileEntityService;

	@Override
	protected Class<DeviceAdImage> getEntityClass() {
		return DeviceAdImage.class;
	}

	public String addImage(String fileId) {
		DeviceAdImage image = new DeviceAdImage();
		image.setImageId(fileId);
		super.save(image);
		return fileId;
	}

	public String removeImage(String id) {
		DeviceAdImage image = super.get(id);
		String imageId = image.getImageId();
		fileEntityService.delete(imageId);
		super.delete(id);
		return imageId;
	}

	@Override
	public List<DeviceAdImage> list() {
		return super.list();
	}

	@Override
	public PagedResults<DeviceAdImage> listPaged(PagedParam pagedParam) {
		return super.listPaged(pagedParam);
	}
}
