const { getTax } = require('../../getTax');

describe('Mexico', () => {
  describe('IVA', () => {
    test('Normal', () => {
      const q = {
        country: "MX",
        txType: "sales",
        docType: "invoice",
        taxes: ["IVA"],
      };

      expect(getTax(q)).toEqual(
        expect.objectContaining({
          result: 0.16
        })
      );
    });

    test('Pharmacy Drug', () => {
      const q = {
        country: "MX",
        txType: "sales",
        docType: "invoice",
        category: 'DRUG',
        area: 'PHARMACY',
        taxes: ["IVA"],
      };

      expect(getTax(q)).toEqual(
        expect.objectContaining({
          result: 0
        })
      );
    });
  });

  describe('RET', () => {
    test('RET_IVA', () => {
      const q = {
        country: "MX",
        txType: "income",
        docType: "invoice",
        taxes: ["RET_IVA"],
      };

      expect(getTax(q)).toEqual(
        expect.objectContaining({
          result: 0.167
        })
      );
    });

    test('RET_ISR', () => {
      const q = {
        country: "MX",
        txType: "income",
        docType: "invoice",
        taxes: ["RET_ISR"],
      };

      expect(getTax(q)).toEqual(
        expect.objectContaining({
          result: 0.1
        })
      );
    });
  });

  describe('PAYROLL', () => {
    test('N.L.', () => {
      const q = {
        country: "MX",
        region: 'NL',
        txType: "income",
        category: 'NOMINA',
        taxes: ["PAYROLL"],
      };

      expect(getTax(q)).toEqual(
        expect.objectContaining({
          result: 0.02
        })
      );
    });

    test('D.F.', () => {
      const q = {
        country: "MX",
        region: 'DF',
        txType: "income",
        category: 'NOMINA',
        taxes: ["PAYROLL"],
      };

      expect(getTax(q)).toEqual(
        expect.objectContaining({
          result: 0.03
        })
      );
    });
  });

  describe('Multi Taxes', () => {
    test('All-in-one', () => {
      const q = {
        country: "MX",
        region: 'AGS',
        docType: 'ARI',
        txType: "sales",
        bpType: "signed",
        area: 'PHARMACY',
        category: 'DRUG',
        taxes: ['IVA', 'IEPS'],
      };

      expect(getTax(q)).toEqual({
        error: null,
        taxes: [{
          name: 'IVA',
          rate: 0.16,
          factor: 0.16
        }, {
          name: 'IVA',
          rate: 0.05,
          factor: 0.05
        }]
      });
    });
  });
});

