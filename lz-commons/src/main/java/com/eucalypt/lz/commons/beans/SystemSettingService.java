package com.eucalypt.lz.commons.beans;

import com.eucalypt.framework.core.service.AbstractService;
import org.springframework.stereotype.Component;

/**
 * Created by zhaoyang on 17/7/2.
 */
@Component
public class SystemSettingService extends AbstractService<SystemSetting> {

	@Override
	protected Class<SystemSetting> getEntityClass() {
		return SystemSetting.class;
	}

	public String save(SystemSetting setting) {
		return super.save(setting);
	}

	public SystemSetting get() {
		SystemSetting systemSetting = super.get();
		if (systemSetting == null) {
			synchronized (this) {
				systemSetting = new SystemSetting();
				super.save(systemSetting);
			}
		}
		return systemSetting;
	}
}
