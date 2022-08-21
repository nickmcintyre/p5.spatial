/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

describe('Turf', function () {
  let pInst;

  beforeEach(function () {
    pInst = new p5(function () {});
  });

  afterEach(function () {
    pInst.remove();
  });

  describe('turf', function () {
    it('should exist', function () {
      expect(pInst.turf).to.be.an.instanceOf(Object);
    });
  });
});
