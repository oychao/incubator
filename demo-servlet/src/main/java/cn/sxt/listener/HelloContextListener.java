package cn.sxt.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class HelloContextListener implements ServletContextListener {
	@Override
	public void contextInitialized(ServletContextEvent sce) {
		System.out.println("listener(servlet context): initialized");
	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		System.out.println("listener(servlet context): destroyed");
	}
}
