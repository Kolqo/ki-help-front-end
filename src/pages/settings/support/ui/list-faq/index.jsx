import "./styles.css";

import { AccordionTemplate } from "../../../../../shared/ui";
import { ArrowIcon } from "../../assets";
import faqList from "../../const/faqList";

export default function ListFaq() {
  return (
		<>
			<div className='style-list-faq'>
				<p>FAQ</p>
				{faqList.map(item => (
					<AccordionTemplate
						key={item.id}
						rightData={<ArrowIcon />}
						centerData={{ header: item.question }}
						bottomData={item.answer}
						height={54}
					/>
				))}
			</div>
		</>
	)
}