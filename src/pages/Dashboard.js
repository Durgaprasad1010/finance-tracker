import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Cards from '../components/Cards'
import { Modal } from 'antd'
import AddExpense from '../components/Modals/addExpense'
import AddIncome from '../components/Modals/addIncome'
import moment from 'moment'
import { auth, db } from '../firebase'
import { addDoc, collection, getDocs, query } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { toast } from 'react-toastify'
import TransactionTable from '../components/TransactionTable'
import ChartComponent from '../components/Charts'
import NoTransactions from '../components/NoTransactions'

function Dashboard() {

    const [transactions, setTransactions] = useState([])

    const [loading, setLoading] = useState(false)

    const [user] = useAuthState(auth)
    const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false)
    const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false)

    const [income, setIncome] = useState(0)
    const [expenses, setExpenses] = useState(0)
    const [totalBalance, setTotalBalance] = useState(0)

    const showExpenseModal = () => {
        setIsExpenseModalVisible(true)
    }
    const showIncomeModal = () => {
        setIsIncomeModalVisible(true)
    }
    const handleExpenseCancel = () => {
        setIsExpenseModalVisible(false)
    }
    const handleIncomeCancel = () => {
        setIsIncomeModalVisible(false)
    }

    const onFinish = (values, type) => {
        const newTransaction = {
            type: type,
            date: values.date.format("MM-DD-YYYY"),
            amount: parseFloat(values.amount),
            tag: values.tag,
            name: values.name
        }
        console.log(newTransaction)

        addTransaction(newTransaction)
    }

    async function addTransaction(transaction, many) {
        try {
            console.log(user)
            const docRef = await addDoc(collection(db, `users/${user.uid}/transactions`), transaction)

            console.log("Document written with ID: ", docRef.id)
            if (!many) toast.success("Transaction Added!")

            //To update values on dashboard page

            let newArr = transactions
            newArr.push(transaction)
            setTransactions(newArr)
            calculateBalance()
        } catch (e) {
            console.error("Error adding document: ", e);
            if (!many) toast.error("Couldn't add transaction")

        }
    }



    async function fetchTransactions() {
        setLoading(true);
        if (user) {
            const q = query(collection(db, `users/${user.uid}/transactions`))
            const querySnapshot = await getDocs(q)
            let transactionsArray = []
            querySnapshot.forEach((doc) => {
                //doc.data() is never undefined for query doc snapshots
                transactionsArray.push(doc.data())
            })
            setTransactions(transactionsArray)
            console.log("Transaction array>>", transactionsArray)
            toast.success("Transaction Fetched!")
        }
        setLoading(false)
    }

    useEffect(() => {
        // Get aal docs from collection
        fetchTransactions()
    }, [])

    function calculateBalance() {
        let incomeTotal = 0
        let expensesTotal = 0
        transactions.forEach((transaction) => {
            if (transaction.type === "income") {

                incomeTotal += transaction.amount

            } else {
                expensesTotal += transaction.amount
            }
        })

        setIncome(incomeTotal)
        setExpenses(expensesTotal)
        setTotalBalance(incomeTotal - expensesTotal)
    }

    useEffect(() => {
        calculateBalance()
    }, [transactions])


    let sortedTransactions = transactions.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
    })

    return (
        <div>
            <Header />

            {loading ? (<p>Loading...</p>) : (
                <>
                    <Cards
                        income={income}
                        expenses={expenses}
                        totalBalance={totalBalance}
                        showExpenseModal={showExpenseModal}
                        showIncomeModal={showIncomeModal}

                    />
                    {transactions.length != 0 ? <ChartComponent sortedTransactions={sortedTransactions} /> : <NoTransactions />}
                    <AddIncome
                        isIncomeModalVisible={isIncomeModalVisible}
                        handleIncomeCancel={handleIncomeCancel}
                        onFinish={onFinish}
                    />
                    <AddExpense
                        isExpenseModalVisible={isExpenseModalVisible}
                        handleExpenseCancel={handleExpenseCancel}
                        onFinish={onFinish}
                    />

                    <TransactionTable

                        transactions={transactions}
                        addTransaction={addTransaction}
                        fetchTransactions={fetchTransactions}
                    />
                </>
            )
            }
        </div>
    )
}

export default Dashboard