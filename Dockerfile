FROM node:6.2.1

RUN mkdir -p /root/app
WORKDIR /root/app

COPY package.json /root/app/package.json
RUN npm install && npm cache clean

COPY . /root/app/
RUN git rev-parse HEAD >git_commit_hash.txt

CMD ["npm", "start"]
