const Balance = require("../models/balance");

exports.getData = (req, res) => {
  Balance.find((err, txns) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.json(txns);
  }).sort({ date: -1 });
};

exports.postData = (req, res) => {
  let sum;
  Balance.findOne()
    .sort({ $natural: -1 })
    .limit(1)
    .exec((err, txn) => {
      if (err) {
        console.log(err);
      } else {
        if (txn == null) {
          sum = 0;
        } else sum = txn.balance;

        if (req.body.isCredit) {
          sum = sum + parseInt(req.body.amount);
        } else {
          sum = sum - parseInt(req.body.amount);
        }
        let newTxn = {
          description: req.body.description,
          isCredit: req.body.isCredit,
          amount: req.body.amount,
          dateOf: req.body.dateOf,
          balance: JSON.stringify(sum)
        };
        // console.log(newTxn);
        Balance.create(newTxn, (err, txn) => {
          if (err) {
            return res.status(400).json({ error: "Transaction Failed" });
          }
          res.json(txn);
        });
      }
    });
};
