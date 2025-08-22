const addIdentifierFields = isIdentifier => [
	...(!isIdentifier
		? [
				{
					section: { header: 'ІДЕНТИФІКАТОР' },
					placeholder: 'Напишіть ідентифікатор',
				},
		  ]
		: []),
	{
		section: { header: 'ОПИС' },
		placeholder: 'Напишіть опис',
	},
]

export default addIdentifierFields
