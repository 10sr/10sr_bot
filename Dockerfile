FROM node:6.2.1

RUN mkdir -p /root/app
WORKDIR /root/app
EXPOSE 5000

COPY package.json /root/app/package.json
RUN npm install && npm cache clean

COPY . /root/app/
RUN git describe --abbrev=8 --always --dirty >git_version.txt

CMD ["npm", "start"]
