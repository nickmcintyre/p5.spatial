/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import * as L from 'leaflet';
import { Map } from 'leaflet';
import 'leaflet-providers';
import { Element } from 'p5';

declare const document: any;
declare const p5: any;

// ====================
//    Core methods
// ====================

p5.prototype._addLeafletStyle = function _addLeafletStyle() {
  const styleTag = document.createElement('link');
  document.head.appendChild(styleTag);
  styleTag.rel = 'stylesheet';
  styleTag.href = 'https://unpkg.com/leaflet@1.8.0/dist/leaflet.css';
};

p5.prototype.registerMethod('init', p5.prototype._addLeafletStyle);

p5.prototype._removeMaps = function _removeMaps() {
  const maps: Map[] = Object.values(this._maps);
  maps.forEach((m: Map) => m.remove());
};

p5.prototype.registerMethod('init', p5.prototype._addLeafletStyle);

p5.prototype.L = L;

p5.prototype._maps = { current: undefined };

p5.prototype.center = function _center(lng: number, lat: number): void {
  const m: Map = this._maps.current;
  if (m) {
    m.panTo([lat, lng]);
  }
};

// eslint-disable-next-line consistent-return
p5.prototype.zoom = function _zoom(zoom: number): void | number {
  const m: Map = this._maps.current;
  if (m) {
    if (zoom) {
      m.setZoom(zoom, { animate: false });
    } else {
      return m.getZoom();
    }
  }
};

p5.prototype.provider = function _provider(tileProvider: string): void {
  const m: Map = this._maps.current;
  if (m) {
    this.L.tileLayer.provider(tileProvider).addTo(m);
  }
};

p5.prototype.createMap = function _createMap(
  id: string = 'map',
  tileProvider: string = 'Stamen.Toner',
): Map {
  const div: Element = this.createDiv();
  div.id(id);
  div.size(this.width, this.height);
  const m: Map = this.L.map(id);
  m.setView([0, 0], 5);
  this.L.tileLayer.provider(tileProvider).addTo(m);
  this.L.overlay = this.L.Layer.extend({
    onAdd: () => {
      const overlayPane = overlay.getPane();
      const container = this.L.DomUtil.create('div', 'leaflet-layer');
      container.appendChild(this._renderer.canvas);
      overlayPane.appendChild(container);
    },
  });
  const overlay = new this.L.overlay();
  m.addLayer(overlay);
  m.on('move', () => {
    // @ts-ignore
    const d = m.dragging._draggable;
    if (d._newPos) {
      this._renderer.canvas.style.transform = `translate(${-d._newPos.x}px, ${-d._newPos.y}px)`;
    }
  });
  this._maps[id] = m;
  return m;
};

p5.prototype.beginMap = function _beginMap(id: string = 'map') {
  const m: Map = this._maps[id];
  if (m) {
    this._maps.current = m;
  } else {
    this._maps.current = this.createMap(id);
  }
  this.clear();
  this.push();
};

p5.prototype.endMap = function _endMap() {
  this._maps.current = undefined;
  this.pop();
};

// ====================
//    2D Primitives
// ====================

p5.prototype._arc = p5.prototype.arc;

p5.prototype.arc = function _arc(
  x: number,
  y: number,
  w: number,
  h: number,
  start: number,
  stop: number,
  mode: number,
  detail: number,
): void {
  const m: Map = this._maps.current;
  if (m) {
    const cp = m.latLngToContainerPoint({ lat: y, lng: x });
    this._arc(cp.x, cp.y, w, h, start, stop, mode, detail);
  } else {
    this._arc(x, y, w, h, start, stop, mode, detail);
  }
};

p5.prototype._ellipse = p5.prototype.ellipse;

p5.prototype.ellipse = function _ellipse(
  x: number,
  y: number,
  w: number,
  h: number,
  detail: number,
): void {
  const m: Map = this._maps.current;
  if (m) {
    const cp = m.latLngToContainerPoint({ lat: y, lng: x });
    this._ellipse(cp.x, cp.y, w, h, detail);
  } else {
    this._ellipse(x, y, w, h, detail);
  }
};

p5.prototype._circle = p5.prototype.circle;

p5.prototype.circle = function _circle(
  x: number,
  y: number,
  d: number,
): void {
  const m: Map = this._maps.current;
  if (m) {
    const cp = m.latLngToContainerPoint({ lat: y, lng: x });
    this._circle(cp.x, cp.y, d);
  } else {
    this._circle(x, y, d);
  }
};

p5.prototype._line = p5.prototype.line;

p5.prototype.line = function _line(...args): void {
  const m: Map = this._maps.current;
  if (m) {
    const cp1 = m.latLngToContainerPoint({ lat: args[1], lng: args[0] });
    const cp2 = m.latLngToContainerPoint({ lat: args[3], lng: args[2] });
    this._line(cp1.x, cp1.y, cp2.x, cp2.y);
  } else {
    this._line(...args);
  }
};

p5.prototype._point = p5.prototype.point;

p5.prototype.point = function _point(
  x: number,
  y: number,
  z: number,
): void {
  const m: Map = this._maps.current;
  if (m) {
    const cp = m.latLngToContainerPoint({ lat: y, lng: x });
    this._point(cp.x, cp.y);
  } else {
    this._point(x, y, z);
  }
};

p5.prototype._quad = p5.prototype.quad;

p5.prototype.quad = function _quad(...args): void {
  const m: Map = this._maps.current;
  if (m) {
    if (args.length === 8 || args.length === 10) {
      const cp1 = m.latLngToContainerPoint({ lat: args[1], lng: args[0] });
      const cp2 = m.latLngToContainerPoint({ lat: args[3], lng: args[2] });
      const cp3 = m.latLngToContainerPoint({ lat: args[5], lng: args[4] });
      const cp4 = m.latLngToContainerPoint({ lat: args[7], lng: args[6] });
      this._quad(cp1.x, cp1.y, cp2.x, cp2.y, cp3.x, cp3.y, cp4.x, cp4.y, args[8], args[9]);
    }
  } else {
    this._quad(...args);
  }
};

p5.prototype._rect = p5.prototype.rect;

p5.prototype.rect = function _rect(...args): void {
  const m: Map = this._maps.current;
  if (m) {
    const rm: string = this._renderer._rectMode;
    if (rm === this.CORNER || rm === this.RADIUS || rm === this.CENTER) {
      const cp = m.latLngToContainerPoint({ lat: args[1], lng: args[0] });
      this._rect(cp.x, cp.y, ...args.slice(2));
    } else if (rm === this.CORNERS) {
      const cp1 = m.latLngToContainerPoint({ lat: args[1], lng: args[0] });
      const cp2 = m.latLngToContainerPoint({ lat: args[3], lng: args[2] });
      this._rect(cp1.x, cp1.y, cp2.x, cp2.y, ...args.slice(4));
    }
  } else {
    this._rect(...args);
  }
};

p5.prototype._square = p5.prototype.square;

p5.prototype.square = function _square(...args): void {
  const m: Map = this._maps.current;
  if (m) {
    const cp = m.latLngToContainerPoint({ lat: args[1], lng: args[0] });
    this._square(cp.x, cp.y, ...args.slice(2));
  } else {
    this._square(...args);
  }
};

p5.prototype._triangle = p5.prototype.triangle;

p5.prototype.triangle = function _triangle(...args): void {
  const m: Map = this._maps.current;
  if (m) {
    const cp1 = m.latLngToContainerPoint({ lat: args[1], lng: args[0] });
    const cp2 = m.latLngToContainerPoint({ lat: args[3], lng: args[2] });
    const cp3 = m.latLngToContainerPoint({ lat: args[5], lng: args[4] });
    this._triangle(cp1.x, cp1.y, cp2.x, cp2.y, cp3.x, cp3.y);
  } else {
    this._triangle(...args);
  }
};
