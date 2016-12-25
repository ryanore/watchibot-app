import React from 'react';
import DatePicker from 'react-datepicker';

export default props => {
	const { planYear, planYears, startDate, endDate, onChangeYear, onChangeDate } = props;
	/**
	 * Regulate input and callback to send
	 */
	const handleDateChange = ({ newStart, newEnd }) => {
		newStart = newStart || startDate;
		newEnd = newEnd || endDate;

		if (newStart.isAfter(newEnd)) {
			const temp = newStart;
			newStart = newEnd;
			newEnd = temp;
		}
		onChangeDate({startDate: newStart.format(), endDate: newEnd.format()});
	};

	return (
		<div className="date-selector">
			<div className="date-year date-header">
				Plan Year
				<div>
					<select onChange={ e => onChangeYear(e.target.value) } value={planYear}>
						{planYears.map( year => (
							<option key={year} value={year}>{year}</option>
						))}
					</select>
				</div>
			</div>

			<div className="date-header">
				Start Date
				<DatePicker
					selected={startDate}
					startDate={startDate}
					endDate={endDate}
					onChange={date => handleDateChange({newStart: date})}
					className="date-field"
				/>
			</div>
			<div className="date-header">
				End Date
				<DatePicker
					selected={endDate}
					startDate={startDate}
					endDate={endDate}
					onChange={ date => handleDateChange({newEnd: date})}
					className="date-field" />
			</div>
		</div>
	);
};
