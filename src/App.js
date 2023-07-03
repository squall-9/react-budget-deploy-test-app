import { useState } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Alert from "./components/Alert";
import React from "react";

const App = () => {
  const [charge, setCharge] = useState("");

  const [amount, setAmount] = useState(0);

  const [alert, setAlert] = useState({ show: false });

  const [id, setId] = useState("");

  const [edit, setEdit] = useState(false);

  const [expenses, setExpenses] = useState([
    { id: 1, charge: "렌트비", amount: 1600 },
    { id: 2, charge: "렌트비", amount: 400 },
    { id: 3, charge: "렌트비", amount: 1200 },
  ]);

  const handleCharge = (e) => {
    console.log(e.target.value);
    setCharge(e.target.value);
  };

  const handleAmount = (e) => {
    console.log(typeof e.target.valueAsNumber);
    setAmount(e.target.value);
  };

  const handelSubmit = (e) => {
    e.preventDefault(); // 기본 작동 막아줌
    if (charge !== "" && amount > 0) {
      if (edit) {
        // 수정모드
        const newExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(newExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "아이템이 수정되었습니다." });
      } else {
        // 새로운 값 추가
        const newExpense = { id: crypto.randomUUID(), charge, amount };
        // 불변성을 지켜주기 위해 새로운 expense 생성
        const newExpenses = [...expenses, newExpense];
        setExpenses(newExpenses);
        handleAlert({ type: "success", text: "아이템이 생성되었습니다." });
      }
      // 인풋 초기화
      setCharge("");
      setAmount(0);
    } else {
      console.log("error");
      handleAlert({
        type: "danger",
        text: "charge는 빈 값일 수 없으며 amount는 0값을 넘어야 합니다.",
      });
    }
  };

  const handleDelete = (id) => {
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    console.log(newExpenses);
    setExpenses(newExpenses);
    handleAlert({ type: "danger", text: "아이템이 삭제되었습니다." });
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 7000);
  };

  const handleEdit = (id) => {
    const expense = expenses.find((item) => item.id === id);
    const { charge, amount } = expense;
    setId(id);
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
  };

  const clearItems = () => {
    setExpenses([]);
  };

  return (
    <main className="main-container">
      {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}
      <h1>예산계산기</h1>
      <div style={{ width: "100%", background: "white", padding: "1rem" }}>
        {/* Expense Form */}
        <ExpenseForm
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handelSubmit={handelSubmit}
          charge={charge}
          amount={amount}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </div>

      <div style={{ width: "100%", background: "white", padding: "1rem" }}>
        {/* Expense List */}
      </div>

      <div
        style={{ display: "flex", justifyContent: "end", marfinTop: "1rem" }}
      >
        <p style={{ fontSize: "2rem" }}>
          총지출:
          <span>
            {expenses.reduce((acc, curr) => {
              return (acc += curr.amount);
            }, 0)}
            원
          </span>
        </p>
      </div>
    </main>
  );
};

export default App;
