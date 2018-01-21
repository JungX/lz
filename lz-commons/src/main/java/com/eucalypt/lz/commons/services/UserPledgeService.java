package com.eucalypt.lz.commons.services;

import com.eucalypt.framework.jpa.repository.BaseRepository;
import com.eucalypt.framework.jpa.service.AbstractService;
import com.eucalypt.lz.commons.beans.UserPledge;
import com.eucalypt.lz.commons.repositories.UserPledgeRepository;
import com.google.common.util.concurrent.Striped;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.concurrent.locks.Lock;

@Service
public class UserPledgeService extends AbstractService<UserPledge> {

	private static final Striped<Lock> locks = Striped.lazyWeakLock(512);

	@Autowired
	private UserPledgeRepository userPledgeRepository;

	@Override
	public BaseRepository getRepository() {
		return userPledgeRepository;
	}

	public UserPledge getByUserId(String userId) {
		return userPledgeRepository.findFirstByUserId(userId);
	}

	public UserPledge update(UserPledge userPledge) {
		UserPledge _userPledge = getByUserId(userPledge.getUserId());
		if (_userPledge != null) {
			_userPledge.setAmount(_userPledge.getAmount().add(userPledge.getAmount()));
			return userPledgeRepository.save(_userPledge);
		} else {
			return userPledgeRepository.save(userPledge);
		}
	}

	public void decrease(String userId, BigDecimal amount) {
		UserPledge userPledge = getByUserId(userId);
		if (userPledge != null) {
			Lock lock = locks.get(userId);
			try {
				lock.lock();
				BigDecimal _amount = userPledge.getAmount().subtract(amount);
				if (_amount.intValue() >= 0) {
					userPledge.setAmount(_amount);
					userPledgeRepository.save(userPledge);
				}
			} finally {
				lock.unlock();
			}
		}
	}
}
