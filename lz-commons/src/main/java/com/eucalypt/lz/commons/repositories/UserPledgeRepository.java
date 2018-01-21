package com.eucalypt.lz.commons.repositories;

import com.eucalypt.framework.jpa.repository.BaseRepository;
import com.eucalypt.lz.commons.beans.UserPledge;

public interface UserPledgeRepository extends BaseRepository<UserPledge, Long> {
	UserPledge findFirstByUserId(String userId);
}
