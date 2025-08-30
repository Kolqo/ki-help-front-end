import "./styles.css";

import { Avatar, ListTemplate, TimeFormatter } from "../../../shared/ui";
import { ProfileIcon, PaymentsIcon } from "../assets";

export default function Transaction(props) {
  const leftData = props.item.source.user.photo ? (
    <Avatar photo={props.item.source.user.photo} diameter={31} />
  ) : (
    <PaymentsIcon />
  );

  const typeMap = {
		DEPOSIT: {
			leftData: leftData,
			style: 'deposit',
			data: {
				header: props.item.source.user.username,
				footer: 'Поповнення гаманця',
			},
			amount: `+${props.item.amount} UAH`,
		},
		WITHDRAW: {
			leftData: leftData,
			style: 'withdraw',
			data: {
				header: props.item.source.user.username,
				footer: 'Виплата коштів',
			},
			amount: `-${props.item.amount} UAH`,
		},
		TRANSFER: {
			leftData: <PaymentsIcon />,
			style: 'transfer',
			data: { header: 'Переказ', footer: 'Купівля завдання' },
			amount: `${props.item.amount} UAH`,
		},
		PAYMENTS: {
			leftData: <PaymentsIcon />,
			style: '',
			data: {
				header: props.item.source.user.username,
				footer: 'Виплата коштів',
			},
			amount: `${props.item.amount} UAH`,
		},
	}

  const txMeta = typeMap[props.customType ? props.customType : props.item.type] ?? {
    leftData: <ProfileIcon />,
    style: "",
    data: { header: "Невідомо", footer: "Невідомо" },
  };

  const RightData = (props) => {
    return (
      <div className="transaction-right-data">
        <p className={`amount ${txMeta.style}`}>{txMeta.amount}</p>
        <p className="time">
          <TimeFormatter utcDateString={props.item.createdAt} />
        </p>
      </div>
    );
  };
  return (
		<>
			<ListTemplate
				leftData={txMeta.leftData}
				centerData={{ header: txMeta.data.header, footer: txMeta.data.footer }}
				rightData={<RightData item={props.item} />}
				onClick={props.onClick}
			/>
		</>
	)
}
