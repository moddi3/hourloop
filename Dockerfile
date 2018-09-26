# Docker image for react native.

FROM node:10.11.0

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

ENV maintainer="moddi3"


# Setup environment variables
ENV PATH $PATH:node_modules/.bin

# Install add-apt-repository
# RUN apt install -q software-properties-common python-software-properties
# RUN echo "deb http://http.debian.net/debian jessie-backports main" | \
#       tee --append /etc/apt/sources.list.d/jessie-backports.list > /dev/null

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb http://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

# RUN apt update && apt full-upgrade -y && \
#     apt install -y software-properties-common && \
#     add-apt-repository ppa:openjdk-r/ppa && \
#     apt install -y --no-install-recommends python-dev && \
#     apt install -y --no-install-recommends -t jessie-backports openjdk-8-jdk && \
RUN apt update && apt install -y --no-install-recommends yarn

# Install EXPO
RUN yarn global add expo-cli

RUN yarn install
## Clean up when done
RUN apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    yarn cache clean

COPY . /usr/src/app

# Default react-native server port
EXPOSE 19000

# User creation
# ENV USERNAME dev

# RUN adduser --disabled-password --gecos '' $USERNAME

# # Add Tini
# ENV TINI_VERSION v0.10.0
# ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
# RUN chmod +x /tini

# USER $USERNAME

# Set workdir
# You'll need to run this image with a volume mapped to /home/dev (i.e. -v $(pwd):/home/dev) or override this value

# Tell gradle to store dependencies in a sub directory of the android project
# this persists the dependencies between builds
# ENV GRADLE_USER_HOME /home/$USERNAME/app/android/gradle_deps

ENTRYPOINT ["yarn", "start"]

# CMD [ "expo", "start" ]