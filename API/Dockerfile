FROM wyveo/nginx-php-fpm:php74

# Add application source code
ADD ./src /usr/share/nginx/html

# NGINX Conf
ADD ./build/nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose the port
EXPOSE 80 443

# Add build.sh
ADD ./build/build.sh /builddirty.sh
RUN chmod 775 /builddirty.sh

CMD ["/builddirty.sh"]
