import React from 'react'

import styles from '../../styles/SelectData.module.scss'

const SelectData = (props) => {

	// Get the Select Options Array from props
	const optionsArr = props.options

	// Generate an array of options list for the select element
	const optionElements = optionsArr.map((option) => {
		return <option key={option.value} value={option.value}>{option.text}</option>
	})

	// Render the Select Options
	return (
		<>
			<span className={styles['select-wrapper']}>
				<select name={props.name} id={props.id} defaultValue={"select"} onChange={props.onChange}>
					<option value="select" hidden disabled >{props.initial}</option>
					{optionElements}
				</select>
			</span>
		</>
	)
}

export default SelectData
