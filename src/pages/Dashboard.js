import React, { useState } from 'react'
import Header from '../components/Header'
import Cards from '../components/Cards'
import { Modal } from 'antd'
import AddExpense from '../components/Modals/addExpense'
import AddIncome from '../components/Modals/addIncome'

function Dashboard() {
    const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false)
    const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false)

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
        console.log("On Finish", values, type)
    }

    return (
        <div>
            <Header />
            <Cards
                showExpenseModal={showExpenseModal}
                showIncomeModal={showIncomeModal}

            />
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
        </div>
    )
}

export default Dashboard