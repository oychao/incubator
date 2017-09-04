package cn.sxt.servlet;

import java.io.IOException;

import javax.servlet.Servlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

// Servlet实现方式之一，实现Servlet接口
public class HelloServlet1 implements Servlet {

	@Override
	public void destroy() {
		// invoked when destroy
	}

	@Override
	public ServletConfig getServletConfig() {
		return null;
	}

	@Override
	public String getServletInfo() {
		return null;
	}

	@Override
	public void init(ServletConfig arg0) throws ServletException {
		// invoked when initialize
	}

	@Override
	public void service(ServletRequest arg0, ServletResponse arg1) throws ServletException, IOException {
		// handle logic
		arg1.getWriter().append("from Servlet");
	}

}
