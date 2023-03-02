import React, { useEffect,useState } from "react";
import closeSvgIcon from ".././img/close.svg";
import { IoMdSettings } from "react-icons/io";
import Spinner from "../elements/Spinner";
import Toggle from "react-toggle";


const ColumnCards: React.FC = () => {
    //хук который показывает состояние загрузки задач из localstorage
	const [isLoaded, setLoaded] = React.useState<boolean>(false);

    //хук который показывает состояние загрузки задач по столбцам
	const [isLoadedTasks, setLoadedTasks] = React.useState<boolean>(false);

    //просто костыль
	let kek: any;
	let kek2: any;
	React.useEffect(() => {
		if (window.localStorage.getItem("settings_tasks_900000")) {
			kek = window.localStorage.getItem("settings_tasks_900000");
			kek2 = JSON.parse(kek);
			// console.log("🚀 kek2", kek2);
			setInputsVisible(kek2.inputsVisible);
			setProgressVisible(kek2.progressVisible);
			setTitlesVisible(kek2.titlesVisible);
			setSidebarVisible(kek2.sidebarVisible);
			setLines1(kek2.lines1);
			setLines2(kek2.lines2);
			setRussianLanguage(kek2.russianLanguage);
		}
	}, []);

	const [isVisibleSettings, setVisibleSettings] =
		React.useState<boolean>(false);

	//* настройки
	const [inputsVisible, setInputsVisible] = React.useState<boolean>(
		kek2?.inputsVisible ? kek2?.inputsVisible : true
	);
	const [progressVisible, setProgressVisible] = React.useState<boolean>(
		kek2?.progressVisible ? kek2?.progressVisible : true
	);
	const [titlesVisible, setTitlesVisible] = React.useState<boolean>(
		kek2?.titlesVisible ? kek2?.titlesVisible : true
	);
	const [sidebarVisible, setSidebarVisible] = React.useState<boolean>(
		kek2?.sidebarVisible ? kek2?.sidebarVisible : true
	);
	const [lines1, setLines1] = React.useState<boolean>(
		kek2?.lines1 ? kek2?.lines1 : true
	);
	const [lines2, setLines2] = React.useState<boolean>(
		kek2?.lines2 ? kek2?.lines2 : true
	);
	const [russianLanguage, setRussianLanguage] = React.useState<boolean>(
		kek2?.russianLanguage ? kek2?.russianLanguage : false
	);

	const changeInputsVisible = () => {
		setInputsVisible(!inputsVisible);
	};
	const changeProgressVisible = () => {
		setProgressVisible(!progressVisible);
	};
	const changeTitlesVisible = () => {
		setTitlesVisible(!titlesVisible);
	};
	const changeSidebarVisible = () => {
		setSidebarVisible(!sidebarVisible);
	};
	const changeRussianLanguage = () => {
		setRussianLanguage(!russianLanguage);
	};
	const changeLines1 = () => {
		setLines1(!lines1);
	};
	const changeLines2 = () => {
		setLines2(!lines2);
	};

	const random = (min: number, max: number) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};
	const [counter, setCounter] = React.useState<any>(0);
	const [dropped, setDropped] = React.useState<boolean>(false);
	const [unTable, setUnTable] = React.useState<any>({
		id: 10000000000000,
		title: "New",
		items: [],
	});
	const [newTask, setNewTask] = React.useState<any>("");
	const addNewTaskMega = () => {
		if (newTask.split("").length > 0) {
			let newItem = {
				id: random(0, 12312312312312),
				title: newTask,
			};
			let newitems = [...unTable.items, newItem];
			setUnTable({
				id: 10000000000000,
				title: "New",
				items: newitems,
			});
			setNewTask("");
			setCounter((prev: any) => prev + 1);
		} else {
			return;
		}
	};

	const [currentTable, setCurrentTable] = React.useState<any>();
	const [currentBoard, setCurrentBoard] = React.useState<any>(null);
	const [currentItem, setCurrentItem] = React.useState<any>(null);
	const [indexTask, setIndexTask] = useState<any>(0);
	const textRef1 = React.useRef();
	const textRef2 = React.useRef();
	const textRef3 = React.useRef();
	const textRef4 = React.useRef();
	function dropCardHandler(e: any, table?: any, board?: any) {
		setDropped(true);
		if (
			board == "new" &&
			currentItem.board > -1 &&
			currentItem.table > -1
		) {

			let newitem = {
				id: 10000000000000,
				title: "New",
				items: [...unTable.items, currentItem.item],
			};
			let newTables = tables;
			let itemid = currentItem.item.id;
			let indexSplice;
			// console.log(currentItem.board);
			newTables[currentItem.table].database[currentItem.board].items.map(
				(el: any, elindex: any) => {
					if (el.id == itemid) {
						indexSplice = elindex;
					}
				}
			);
			newTables[currentItem.table].database[
				currentItem.board
			].items.splice(indexSplice, 1);
			setTables(newTables);
			setUnTable(newitem);
		} else if (
			board !== "new" &&
			currentItem.board == "new" &&
			currentItem.table == "new"
		) {

			let newUntable = unTable.items.filter(
				(el: any) => el.id !== currentItem.item.id
			);
			let newitem = {
				id: 10000000000000,
				title: "New",
				items: newUntable,
			};
			setUnTable(newitem);

			let newTables = tables;
			let itemid = 0;
			newTables[table.id].database.map((el: any, elindex: any) => {
				if (el.id == board.id) {
					itemid = elindex;
				}
			});

			newTables[table.id].database[itemid].items.push(currentItem.item);
			setTables(newTables);
		} else {

			let newTables = tables;
			let itemid = 0;

			//* добавление айтема в список канбан
			newTables[table.id].database.map((el: any, elindex: any) => {
				if (el.id == board.id) {
					itemid = elindex;
				}
			});
			newTables[table.id].database[itemid].items.push(currentItem.item);
			

			//* удаление айтема из прошлой позиции

			let indexSplice = 0;
			newTables[currentItem.table].database[currentItem.board].items.map(
				(el: any, elindex: any) => {
					if (el.id == currentItem.item.id) {
						indexSplice = elindex;
					}
				}
			);
			newTables[currentItem.table].database[
				currentItem.board
			].items.splice(indexSplice, 1);

			setTables(newTables);
			setUnTable(JSON.parse(JSON.stringify(unTable)));
		}
		setDropped(false);
	}
	const [tables, setTables] = React.useState<any[]>([
		{
			id: 0,
			storageName: "table0",
			ref: textRef1,
			database: [
				{
					id: random(0, 999991241241243),
					title: "What to do",
					items: [],
				},
				{
					id: random(0, 999991241241243),
					title: "Doing",
					items: [],
				},
				{
					id: random(0, 999991241241243),
					title: "Done",
					items: [],
				},
			],
		},
		{
			id: 1,
			storageName: "table1",
			ref: textRef2,
			database: [
				{
					id: random(0, 999991241241243),
					title: "What to do",
					items: [],
				},
				{
					id: random(0, 999991241241243),
					title: "Doing",
					items: [],
				},
				{
					id: random(0, 999991241241243),
					title: "Done",
					items: [],
				},
			],
		},
		{
			id: 2,
			storageName: "table2",
			ref: textRef3,
			database: [
				{
					id: random(0, 999991241241243),
					title: "What to do",
					items: [],
				},
				{
					id: random(0, 999991241241243),
					title: "Doing",
					items: [],
				},
				{
					id: random(0, 999991241241243),
					title: "Done",
					items: [],
				},
			],
		},
		{
			id: 3,
			storageName: "table3",
			ref: textRef4,
			database: [
				{
					id: random(0, 999991241241243),
					title: "What to do",
					items: [],
				},
				{
					id: random(0, 999991241241243),
					title: "Doing",
					items: [],
				},
				{
					id: random(0, 999991241241243),
					title: "Done",
					items: [],
				},
			],
		},
	]);

	function dragOverHandler(e: any) {
		e.preventDefault();
		if (e.target.className == "item") {
		}
	}

	function dragLeaveHandler(e: any) {
		e.target.style.boxShadow = "none";
	}

	function dragStartHandler(e: any, board: any, item: any, table: any) {
		if (board == "new") {
			setCurrentBoard(unTable);
		} else {
			setCurrentBoard(board);
		}
		setCurrentItem({
			item: item,
			board: board || board == 0 ? board : "new",
			table: table.id || table.id == 0 ? table.id : "new",
		});
	}

	function dragEndHandler(e: any) {
		e.target.style.boxShadow = "none";
	}

	const addNewTask = async (table: any, tableindex: any, ref: any) => {
		if (ref.current && ref.current.value.split("").length > 0) {
			setIndexTask(indexTask + 1);
			const boardsMassiv = table.database[0].items;

			boardsMassiv.push({
				id: random(0, 10000000),
				title: ref.current.value,
			});

			ref.current.value = "";
			setCounter((prev: any) => prev + 1);
		} else {
			setIndexTask(indexTask + 1);
			const boardsMassiv = table.database[0].items;
			boardsMassiv.push({
				id: random(0, 10000000),
				title: ref,
			});
			setCounter((prev: any) => prev + 1);
		}
	};

	const deleteTask = (tableItem: any, boardId: any, itemId: any) => {
		if (boardId == "new" && tableItem == "new") {
			let c = {
				id: 10000000000000,
				title: "New",
				items: unTable.items.filter((p: any) => p.id !== itemId),
			};
			setUnTable(c);
		} else {
			setIndexTask(indexTask - 1);

			let pos = tableItem.database
				.map(function (el: any) {
					return el.id;
				})
				.indexOf(itemId);

			
			let c = {
				id: tables[tableItem.id].id,
				storageName: tables[tableItem.id].storageName,
				database: [
					...tables[tableItem.id].database.slice(0, pos),
					(tables[tableItem.id].database[pos] = {
						id: tables[tableItem.id].database[pos].id,
						title: tables[tableItem.id].database[pos].title,
						items: tables[tableItem.id].database[pos].items.filter(
							(p: any) => p.id !== boardId
						),
					}),
					...tables[tableItem.id].database.slice(pos + 1),
				],
			};

			setTables((tables: any) => [
				...tables.slice(0, tableItem.id),
				c,
				...tables.slice(tableItem.id + 1),
			]);
		}
	};

	const [howMuchAll, setHowMuchAll] = React.useState<any[]>([0, 0, 0, 0]);
	const [howMuchComppleted, setHowMuchComppleted] = React.useState<any[]>([
		0, 0, 0, 0,
	]);
	const [howMuchDoing, setHowMuchDoing] = React.useState<any[]>([0, 0, 0, 0]);
	const heightRef = React.useRef<any>(null);
	const widthRef = React.useRef<any>(null);

	const onKeyDown = (e: any, table: any, tableindex: any, ref: any) => {
		if (e.keyCode == 13) {
			addNewTask(table, tableindex, ref);
		}
	};
	const onKeyDownNew = (e: any) => {
		if (e.keyCode == 13) {
			addNewTaskMega();
		}
	};
	


	useEffect(() => {
        let token_tasks:any = window.localStorage.getItem("token_tasks_9090909090")
        let parsed_tasks:any = JSON.parse(token_tasks)
		if (parsed_tasks) {
				let trueArray:any = [];
				for (let i = 0; i < parsed_tasks.length; i++) {

                    let item = parsed_tasks[i]
                    console.log('arrayitem is:',item)
					trueArray.push(item);
				}
                console.log('trueArray is:',trueArray)
				let newTable = [
					{
						id: 0,
						storageName: "table0",
						ref: textRef1,
						database: parsed_tasks.firstTableDB,
					},
					{
						id: 1,
						storageName: "table1",
						ref: textRef2,
						database: parsed_tasks.secondTableDB,
					},
					{
						id: 2,
						storageName: "table2",
						ref: textRef3,
						database: parsed_tasks.thirdTableDB,
					},
					{
						id: 3,
						storageName: "table3",
						ref: textRef4,
						database: parsed_tasks.fourthTableDB,
					},
				];
				setTables(newTable);
				setUnTable({
					id: 10000000000000,
					title: "New",
					items: parsed_tasks.newTasks,
				});

				setLoaded(true);
                setLoadedTasks(true)
		} 
        else{
            setLoaded(true);
        }
	}, []);

    // хук useEffect который следит за изменениями на доске и сразу обновляет данные в localstorage
	useEffect(() => {
		setHowMuchAll([
			tables[0].database[0].items.length +
				tables[0].database[1].items.length +
				tables[0].database[2].items.length,
			tables[1].database[0].items.length +
				tables[1].database[1].items.length +
				tables[1].database[2].items.length,
			tables[2].database[0].items.length +
				tables[2].database[1].items.length +
				tables[2].database[2].items.length,
			tables[3].database[0].items.length +
				tables[3].database[1].items.length +
				tables[3].database[2].items.length,
		]);
		setHowMuchComppleted([
			tables[0].database[2].items.length,
			tables[1].database[2].items.length,
			tables[2].database[2].items.length,
			tables[3].database[2].items.length,
		]);
		setHowMuchDoing([
			tables[0].database[1].items.length,
			tables[1].database[1].items.length,
			tables[2].database[1].items.length,
			tables[3].database[1].items.length,
		]);
		let update = {
			firstTableDB: (tables[0].database),
			secondTableDB: (tables[1].database),
			thirdTableDB: (tables[2].database),
			fourthTableDB: (tables[3].database),
			newTasks: (unTable.items),
		};

        window.localStorage.setItem(
            "token_tasks_9090909090",
            JSON.stringify(update)
        );

	}, [tables, unTable, currentItem, dropped, counter]);

    // хук по сохранению настроек если они меняеются
	React.useEffect(() => {
		let settings = {
			inputsVisible: inputsVisible,
			progressVisible: progressVisible,
			titlesVisible: titlesVisible,
			sidebarVisible: sidebarVisible,
			lines1: lines1,
			lines2: lines2,
			russianLanguage: russianLanguage,
		};

		window.localStorage.setItem(
			"settings_tasks_900000",
			JSON.stringify(settings)
		);
	}, [
		inputsVisible,
		progressVisible,
		titlesVisible,
		sidebarVisible,
		lines1,
		lines2,
		russianLanguage,
	]);

	if (!isLoaded) {
		return <Spinner />;
	}

	return (
		<div
			ref={widthRef}
			onClick={() => {
				setVisibleSettings(false);
			}}
			className="flex justify-between relative"
		>
			{sidebarVisible && (
				<div className="min-w-[200px] lg:min-w-[250px] border-r-2 h-[100vh] border-nice p-2">
					<input
						value={newTask}
						onChange={(e) => setNewTask(e.target.value)}
						className="w-full text-white bg-good-bg-color p-2 outline-none border-b-2 border-nice"
						placeholder={
							russianLanguage
								? "Введите задачу ..."
								: "Input task ..."
						}
						onKeyDown={(e: any) => onKeyDownNew(e)}
						type="text"
					/>
					<button
						onClick={() => addNewTaskMega()}
						className="border-nice text-nice w-full py-1 px-3 border-2 border-t-0 mb-2 hover:bg-nice/20 "
					>
						{russianLanguage ? "Добавить" : "Add"}
					</button>
					<div
						className="min-h-[350px]"
						onDragOver={(e) => dragOverHandler(e)}
						onDrop={(e) => dropCardHandler(e, "new", "new")}
					>
						{unTable.items
							? unTable.items.map((item: any) => (
									<div
										className="border-nice relative border-2 bg-nice/10 rounded cursor-grab py-1 px-3 my-1 text-nice"
										draggable="true"
										onDragOver={(e) => dragOverHandler(e)}
										onDragLeave={(e) => dragLeaveHandler(e)}
										onDragStart={(e) =>
											dragStartHandler(
												e,
												"new",
												item,
												"new"
											)
										}
										onDragEnd={(e) => dragEndHandler(e)}
									>
										<p className="truncate text-[13px] lg:text-[15px] mr-4">
											{item.title}
										</p>
										<img
											className="absolute top-[6px] right-[6px] lg:top-[7px] lg:right-[7px] hover:opacity-70 cursor-pointer"
											onClick={() =>
												deleteTask(
													"new",
													"new",
													item.id
												)
											}
											src={closeSvgIcon}
											alt=""
										/>
									</div>
							  ))
							: ""}
					</div>
				</div>
			)}
			<div className="h-[100vh] w-full relative z-10 flex justify-between">
				{titlesVisible && (
					<div className="max-w-[50px] h-[100vh] flex flex-col">
						<div className=" flex items-center justify-center h-1/2 max-w-[50px]">
							<p className=" rotate-270 text-lg  font-bold text-orange-200">
								{russianLanguage ? "Важно" : "Important"}
							</p>
						</div>
						<div className="h-1/2 w-[50px]  flex justify-center items-center">
							<p className="rotate-270 text-lg font-bold text-orange-200">
								<p className="w-[150px] text-orange-200">
									{russianLanguage
										? "Неважно"
										: `Not${" "}Important`}
								</p>
								
							</p>
						</div>
					</div>
				)}
				<div className="flex flex-col w-full items-end justify-end relative z-2">
					{titlesVisible && (
						<div className="w-full grid grid-cols-2 h-[50px]">
							<p className="w-fit flex self-center mx-auto text-center text-lg font-bold text-orange-200">
								
								{russianLanguage ? "Срочно" : `Urgent`}
							</p>
							<p className="w-fit flex self-center text-center mx-auto text-lg font-bold text-orange-200">
								{russianLanguage
									? "Несрочно"
									: `Not${" "}Urgent`}
							</p>
						</div>
					)}
					<div
						className={
							titlesVisible
								? "grid grid-cols-2 w-full max-h-[calc(100vh_-_50px)]"
								: "grid grid-cols-2 w-full max-h-[100vh]"
						}
					>
						{tables.map((table: any, tableindex: any) => (
							<div
								ref={heightRef}
								className={
									titlesVisible
										? `px-2 py-2 w-full min-h-[calc(50vh_-_25px)]`
										: `px-2 py-2 w-full min-h-[50vh]`
								}
							>
								
								<div
									className=" h-full 
                                 p-2"
								>
									<div className="flex flex-col xl:flex-row xl:justify-evenly items-center">
										{inputsVisible && (
											<div className="w-full h-[60px] flex">
												<div
													
													className="flex border-nice border-b-2 h-fit self-center mx-auto "
												>
													<input
														className="outline-none bg-good-bg-color border-none py-0 px-1 max-w-[350px] w-full xl:w-[15vw] text-white"
														
														ref={table.ref}
														onKeyDown={(e: any) =>
															onKeyDown(
																e,
																table,
																tableindex,
																table.ref
															)
														}
														placeholder={
															russianLanguage
																? "Введите задачу ..."
																: "Input task ..."
														}
													/>
													<button
														className="border-nice text-nice border-2 py-1 border-b-0 px-4 bg-none hover:bg-nice/20"
														onClick={() =>
															addNewTask(
																table,
																tableindex,
																table.ref
															)
														}
													>
                            {widthRef.current?widthRef.current.clientWidth > 1084?russianLanguage
															? "Добавить"
															: "Add"
                              : '+'
                              : '+'
                            }
														
													</button>
												</div>
											</div>
										)}
										{progressVisible && (
											<div className="h-[60px]  flex justify-center">
												<div className="w-full text-nice h-fit self-center   ">
													<div className="self-center filterLeftWrap max-w-[200px] w-[11vw] relative z-1 flex">
														<div
															className="filterLeft z-1 absolute"
															style={{
																width: `${
																	// 50
																	howMuchAll[
																		tableindex
																	] > 0
																		? Math.floor(
																				(howMuchComppleted[
																					tableindex
																				] /
																					howMuchAll[
																						tableindex
																					]) *
																					100000
																		  ) /
																		  1000
																		: 0
																}%`,
																height: "100%",
															}}
														></div>
														<div
															className="filterLeftOrange z-1 absolute"
															style={{
																width: `${
																	
																	howMuchAll[
																		tableindex
																	] > 0
																		? Math.floor(
																				((howMuchComppleted[
																					tableindex
																				] +
																					howMuchDoing[
																						tableindex
																					]) /
																					howMuchAll[
																						tableindex
																					]) *
																					100000
																		  ) /
																		  1000
																		: 0
																}%`,
																height: "100%",
															}}
														></div>
													</div>
												</div>
											</div>
										)}
									</div>
									<div className="grid grid-cols-3 text-nice">
										{table.database.map(
											(board: any, boardindex: any) => (
												<div
													onDragOver={(e) =>
														dragOverHandler(e)
													}
													onDrop={(e) =>
														dropCardHandler(
															e,
															table,
															board
														)
													}

													style={{
														height: heightRef.current
															? `${
																	heightRef
																		.current
																		.clientHeight -
																	(titlesVisible
																		? 30
																		: 0) -
																	(progressVisible ||
																	inputsVisible
																		? 60
																		: 0) -
																	(widthRef.current
																		? ((widthRef.current.clientWidth < 1366) && progressVisible && inputsVisible)
																			? 60
																			: 0
																		: 0) -
																	25
															  }px`
															: "100%",
													}}
													className={
														boardindex == 0 &&
														lines1
															? "scrolllock px-1 w-full  overflow-y-scroll border-r-2 border-r-black/20"
															: boardindex == 2 &&
															  lines1
															? "scrolllock px-1 w-full  overflow-y-scroll border-l-2 border-l-black/20"
															: "scrolllock px-1 w-full  overflow-y-scroll"
													}
												>
													<div className="board__title text-sm truncate">
														{boardindex == 0 &&
															(russianLanguage
																? "Сделать"
																: "What to do")}
														{boardindex == 1 &&
															(russianLanguage
																? "Делаю"
																: "Doing")}
														{boardindex == 2 &&
															(russianLanguage
																? "Сделано"
																: "Done")}
														{/* {board.title} */}
													</div>
													{board.items.map(
														(item: any) => (
															<div
																draggable="true"
																onDragOver={(
																	e
																) =>
																	dragOverHandler(
																		e
																	)
																}
																onDragLeave={(
																	e
																) =>
																	dragLeaveHandler(
																		e
																	)
																}
																onDragStart={(
																	e
																) =>
																	dragStartHandler(
																		e,
																		boardindex,
																		item,
																		table
																	)
																}
																onDragEnd={(
																	e
																) =>
																	dragEndHandler(
																		e
																	)
																}
																className="w-full break-words border-2 border-nice py-1 px-3 rounded mb-1 cursor-grab bg-nice/10 relative z-2"
															>
                                
																<div className="text-[13px] lg:text-[15px] mr-4">
																	{item.title}
																</div>
																<img
																	className="absolute top-[6px] right-[6px] lg:top-[7px] lg:right-[7px] hover:opacity-70 cursor-pointer"
																	onClick={() =>
																		deleteTask(
																			table,
																			item.id,
																			board.id
																		)
																	}
																	src={
																		closeSvgIcon
																	}
																	alt=""
																/>
															</div>
														)
													)}
												</div>
											)
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>



                {/* Визуальная сетка */}
				<div
					className={
						titlesVisible && lines2
							? "absolute z-1 h-[100vh] border-l-2 border-black/20 top-0 left-[48px] "
							: ""
					}
				></div>
				<div
					className={
						titlesVisible && lines2
							? "absolute z-1 h-[100vh] border-l-2 border-black/20 top-0 left-[52%] "
							: lines2
							? "absolute z-1 h-[100vh] border-l-2 border-black/20 top-0 left-[50%]"
							: ""
					}
				></div>
				<div
					className={
						titlesVisible && lines2
							? "absolute z-1 w-full h-[1px] border-b-2 border-black/20 top-[52.5%] bottom-0"
							: lines2
							? "absolute z-1 w-full h-[1px] border-b-2 border-black/20 top-[50%] bottom-0"
							: ""
					}
				></div>
				<div
					className={
						titlesVisible && lines2
							? "absolute z-1 w-full h-[1px] border-b-2 border-black/20 top-[48px] bottom-0"
							: ""
					}
				></div>

                {/* Настройка видимости блока настроек в зависимости от хука isVisibleSettings */}
				{isVisibleSettings && (
					<div
						onClick={(e) => e.stopPropagation()}
						className="w-[350px] absolute top-[50px] z-5 right-0  bg-[#2e3e49] flex flex-col p-2 shadow-md rounded"
					>
						<p className="text-nice mb-2 text-sm">
							{russianLanguage ? "Настройки" : "Settings"}
						</p>

						<div className="flex mb-1">
							<Toggle
								id="cheese-status"
								defaultChecked={inputsVisible}
								onChange={changeInputsVisible}
							/>
							<label
								htmlFor="cheese-status"
								className="ml-2 text-nice"
							>
								{russianLanguage
									? "Поля для ввода"
									: "Show inputs"}
							</label>
						</div>

						<div className="flex mb-1">
							<Toggle
								id="cheese-status"
								defaultChecked={progressVisible}
								onChange={changeProgressVisible}
							/>
							<label
								htmlFor="cheese-status"
								className="ml-2 text-nice"
							>
								{russianLanguage
									? "Индикаторы прогресса"
									: "Show progress"}
							</label>
						</div>

						<div className="flex mb-1">
							<Toggle
								id="cheese-status"
								defaultChecked={titlesVisible}
								onChange={changeTitlesVisible}
							/>
							<label
								htmlFor="cheese-status"
								className="ml-2 text-nice"
							>
								{russianLanguage
									? "Названия блоков"
									: "Show titles"}
							</label>
						</div>

						<div className="flex mb-1">
							<Toggle
								id="cheese-status"
								defaultChecked={sidebarVisible}
								onChange={changeSidebarVisible}
							/>
							<label
								htmlFor="cheese-status"
								className="ml-2 text-nice"
							>
								{russianLanguage
									? "Боковая панель"
									: "Show sidebar"}
							</label>
						</div>

						<div className="flex mb-1">
							<Toggle
								id="cheese-status"
								defaultChecked={russianLanguage}
								onChange={changeRussianLanguage}
							/>
							<label
								htmlFor="cheese-status"
								className="ml-2 text-nice"
							>
								{russianLanguage
									? "Русский язык"
									: "Russian language"}
							</label>
						</div>

						<div className="flex mb-1">
							<Toggle
								id="cheese-status"
								defaultChecked={lines1}
								onChange={changeLines1}
							/>
							<label
								htmlFor="cheese-status"
								className="ml-2 text-nice"
							>
								{russianLanguage ? "Линии 1" : "Lines 1"}
							</label>
						</div>

						<div className="flex mb-1">
							<Toggle
								id="cheese-status"
								defaultChecked={lines2}
								onChange={changeLines2}
							/>
							<label
								htmlFor="cheese-status"
								className="ml-2 text-nice"
							>
								{russianLanguage ? "Линии 2" : "Lines 2"}
							</label>
						</div>
					</div>
				)}


                {/* Картинка настроек.svg */}
				<IoMdSettings
					onClick={(e: any) => {
						e.stopPropagation();
						e.preventDefault();
						setVisibleSettings(!isVisibleSettings);
					}}
					className="absolute z-6 top-3 right-3 cursor-pointer text-nice hover:text-nice/70 "
					size={25}
				/>

			</div>
		</div>
	);
};

export default ColumnCards;
