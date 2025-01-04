import React from "react";
import { ArrowIcon, BanIcon, DiscountIcon, HistoryTaskIcon, HistoryTransactionIcon, IdIcon, ProfileIcon, Refill, TimeIcon, WalletIcon } from "../assets";
import { PropertyItem, Button } from "../../../shared/ui/index"
import "./styles.css";



export default function User(props) {
  return (
    <>
      <div className="class-user">
        <div className="user-info">
          <PropertyItem  
            className="user-property-item"
            icon={<ProfileIcon/>} 
            propertyName="Ім'я"
            rightComponent={props.userName}
          />
          <PropertyItem
            className="user-property-item"
            icon={<IdIcon/>} 
            propertyName="ID"
            rightComponent={props.userId}
          />
          <PropertyItem  
            className="user-property-item"
            icon={<WalletIcon/>} 
            propertyName="Баланс"
            rightComponent={`${props.userBalance}UAH`}
          />
          <PropertyItem 
            className="user-property-item" 
            icon={<TimeIcon/>} 
            propertyName="Створено"
            rightComponent={props.userTimeRegistration}
          />
          <PropertyItem  
            className="user-property-item"
            icon={<HistoryTaskIcon/>} 
            propertyName="Історія завдань"
            rightComponent={<ArrowIcon/>}
          />
          <PropertyItem  
            className="user-property-item"
            icon={<HistoryTransactionIcon/>} 
            propertyName="Історія транзакцій"
            rightComponent={<ArrowIcon/>}
          />
        </div>
        <div className="user-on-action">
          <Button 
            leftIcon={<Refill/>} 
            className="user-action-button gray-button no-select">
            Поповнити
          </Button>
          <Button 
            leftIcon={<DiscountIcon/>} 
            className="user-action-button gray-button no-select">
            Знижки
          </Button>
          <Button 
            leftIcon={<BanIcon/>} 
            className="user-action-button gray-button no-select">
            Забанити
          </Button>
        </div>
      </div>
    </>
  );
}