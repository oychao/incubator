package cn.sxt.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

public class HelloFilter1 implements Filter {

	private ServletContext context;

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		this.context = filterConfig.getServletContext();
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		this.context.getAttribute("hello");
		HttpServletRequest httpServletRequest = (HttpServletRequest) request;
		httpServletRequest.getSession().setAttribute("username", "hahahaha");
		System.out.println("filter1: before servlet");
		chain.doFilter(request, response);
		System.out.println("filter1: after servlet");
	}

	@Override
	public void destroy() {
	}
}
