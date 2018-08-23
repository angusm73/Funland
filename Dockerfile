FROM nimmis/apache-php7
LABEL maintainer=angusmoore73@gmail.com
ENV DEBIAN_FRONTEND noninteractive

# By default start up apache in the foreground, override with /bin/bash for interative
CMD /usr/sbin/apache2ctl -D FOREGROUND
