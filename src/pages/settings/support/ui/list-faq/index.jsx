import "./styles.css";

import { AccordionTemplate, SectionWrapper } from "../../../../../shared/ui";
import { ArrowIcon } from "../../assets";
import faqList from "../../const/faqItems";

export default function ListFaq() {
  return (
		<>
			<SectionWrapper section={{ header: 'FAQ' }}>
				<div className='style-list-faq'>
					{faqList.map(item => (
						<AccordionTemplate
							key={item.id}
							rightData={<ArrowIcon />}
							centerData={{ header: item.question }}
							bottomData={item.answer}
							height={50}
						/>
					))}
				</div>
			</SectionWrapper>
		</>
	)
}