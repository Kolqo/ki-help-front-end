import "./styles.css";

import { useLocation } from 'react-router-dom'

import ListTask from "./ui/list-task";

import { useGoBack } from '../../../shared/hooks'

export default function HistoryTask() {

  const location = useLocation();
  const { user } = location.state || {};
  useGoBack(user ? `/settings/admin-panel/profile` : `/settings` );
  const telegramId = user ? user.telegramId : window.Telegram.WebApp.initDataUnsafe.user.id
  
  return (
    <>
      <div className="container-history-task"> 
        <ListTask telegramId={telegramId}/>
      </div>
    </>
  );
}