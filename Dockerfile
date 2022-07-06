FROM buildkite/puppeteer:10.0.0

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome

RUN mkdir -p /usr/share/fonts/opentype/axiforma

COPY src/templates/fonts/*otf /usr/share/fonts/opentype/axiforma/

RUN fc-cache -f -v

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install dotenv

COPY . ./

EXPOSE 5000

CMD ["npm", "start", "--no-daemon"]
