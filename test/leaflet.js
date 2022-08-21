/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

describe('Leaflet', function () {
  let pInst;

  beforeEach(function () {
    pInst = new p5(function () {});
  });

  afterEach(function () {
    pInst.remove();
  });

  describe('L', function () {
    it('should exist', function () {
      expect(pInst.L).to.be.an.instanceOf(Object);
    });
  });

  describe('createMap()', function () {
    it('should create a map', function () {
      const m = pInst.createMap();
      expect(m).to.be.an.instanceOf(pInst.L.Map);
    });
  });
});
