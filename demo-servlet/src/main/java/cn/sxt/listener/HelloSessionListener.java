package cn.sxt.listener;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

public class HelloSessionListener implements HttpSessionListener {

	public HelloSessionListener() {
	}

	public void sessionCreated(HttpSessionEvent se) {
		System.out.println("listener(http session): " + se.getSession().getId() + " created");
	}

	public void sessionDestroyed(HttpSessionEvent se) {
		System.out.println("listener(http session): destroyed");
	}
}
 