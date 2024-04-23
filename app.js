import t from "express";
import n from "fs";
import s from "body-parser";
let server = t();

function toRadians(t) {
     return t * Math.PI / 180
}

function haversine(t, n, s, e) {
     let a = toRadians(s - t)
          , o = toRadians(e - n)
          , i = Math.sin(a / 2) * Math.sin(a / 2) + Math.cos(toRadians(t)) * Math.cos(toRadians(s)) * Math.sin(o / 2) * Math.sin(o / 2);
     return 3958.8 * (2 * Math.atan2(Math.sqrt(i), Math.sqrt(1 - i)))
}

function triangulatePoint(t, n, s, e) {
     let a = haversine(t.lat, t.lon, n.lat, n.lon)
          , o;
     return {
          lat: t.lat + (n.lat - t.lat) * (s / a)
          , lon: t.lon + (n.lon - t.lon) * (e / a)
     }
}
server.use(s.json()), server.post("/api/predict", async (t, n) => {
     let {
          location1: s
          , location2: e
          , distance1: a
          , distance2: o
     } = t.body, i = triangulatePoint({
          lat: +s.split(", ")[0]
          , lon: +s.split(", ")[1]
     }, {
          lat: +e.split(", ")[0]
          , lon: +e.split(", ")[1]
     }, a, o);
     console.log(i), n.json(i)
}), server.get("/", async (t, s) => {
     let e = await n.promises.readFile("index.html", "utf8");
     s.end(e)
}), server.listen(8080);
