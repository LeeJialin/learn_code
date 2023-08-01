function (params, refs) {
  let data = params.data.Table[0];
  let table = params.data.Table2;
  let tableTwo = params.data.Table1;
  console.log(table, "==");

  let lotName = params.data.Table[0].lotName || ''
  console.log(11111,params)
  console.log("lotName2222222",lotName)
  let pieData = []
 try {
        axios({
         // url: `http://124.71.33.56/HBL/getLotScErrorRate?lotName=${lotName}`,
         url: `/HBL/getLotScErrorRate?lotName=${lotName}`,
        method: "get",
        // params: {
        //   user: "",
        // },
      })
      .then(
        (res) => {
          if (res.status == 200) {
            let arrStr = [
              {labe:'SmoothingPFR',value:'SmoothingPFRDefectCount'},
              {labe:'PFR',value:'PFRDefectCount'},
              {labe:'HD2',value:'HD2DefectCount'},
              {labe:'HD3',value:'HD3DefectCount'},
              {labe:'THD',value:'THDDefectCount'},
              {labe:'HOHD6',value:'HOHD6DefectCount'},
              {labe:'HOHD10',value:'HOHD10DefectCount'},
              {labe:'TD6',value:'TD6DefectCount'},
              {labe:'TD10',value:'HD10DefectCount'},
              {labe:'TD',value:'HDDefectCount'},
              {labe:'Harmonic2',value:'Harmonic2DefectCount'},
              {labe:'Harmonic3',value:'Harmonic3DefectCount'},
              {labe:'Harmonic4',value:'Harmonic4DefectCount'},
              {labe:'Harmonic5',value:'Harmonic5DefectCount'},
              {labe:'PRB',value:'PRBDefectCount'},
              {labe:'ZFR',value:'ZFRDefectCount'},
              {labe:'Phase',value:'PhaseDefectCount'},
              {labe:'Multiple多项',value:'MultipleDefectCount'},
          ]
          let data = res?.data?.info?.data;
            arrStr.forEach(item => {
              if(data.hasOwnProperty(item.value)){
                pieData.push({
                  name:item.labe,
                  value:data[item.value]
                })
              }
            })
            // 饼状图数据
      console.log("饼状图数据==============>",pieData);
      // refs["f1877c1b-5e1f-437d-8a39-6775c1e3e455"].dataChart = [];
      refs["f1877c1b-5e1f-437d-8a39-6775c1e3e455"].dataChart.push(...pieData);
          }
        },
        (err) => {
          return err
          console.log(err);
          this.$message({
            message: "请求失败！",
            type: "error",
          });
        }
      )
 } catch (error) {
  console.log("errror=========>",errror);
 }



  let list1 = [
    {
      name: "工单编号",
      value: data.lotName || "",
    },
    {
      name: "产品型号",
      value: data.productDesc || "",
    },
    {
      name: "产品料号",
      value: data.productName || "",
    },
    {
      name: "工单开始时间",
      value: data.startTime || "",
    },
    {
      name: "工单结束时间",
      value: data.endTime || "",
    },
  ]; //第一列数据
  let list2 = [
    {
      name: "工单数量",
      value: data.lotQty || "",
    },
    {
      name: "不良数累计",
      value: data.fail || "",
    },
    {
      name: "工单直通率",
      value: data.fpy ?  data.fpy.toFixed(1) + "%" : "",
    },
    {
      name: "工单不良率",
      value: data.defectRate ? data.defectRate.toFixed(1) + "%" : "",
    },
    {
      name: "工单完成率",
      value: data.lastStepRate ?  data.lastStepRate.toFixed(1) + "%" : "",
    },
  ];

  let tableTwoList = [];
  tableTwo.forEach(item => {
    tableTwoList.push([ item.name,item.Column1,item.pass,item.fail,item.completeRate ])
  })

  //柱状图数据
  let uphs = []; // 标准产量
  let passList = []; // 过站数量
  let fails = []; // 不良数量
  let failRates = []; // 不良率
  let produceRates = []; // 生产效率
  table.forEach(item => {
    uphs.push(item.uph);
    passList.push(item.pass);
    fails.push(item.fail);
    failRates.push(item.failRate);
    produceRates.push(item.produceRate);
  })
  let seriesList = [
    {
      name: "标准产量",
      data: uphs,
      type: "bar",
    },
    {
      name: "实际产量",
      data: passList,
      type: "bar",
    },
    {
      name: "不良数量",
      data: fails,
      type: "bar",
    },
    {
      name: "不良率",
      type: "line",
      data: failRates,
    },
    {
      name: "生产效率",
      type: "line",
      data: produceRates,
    },
  ];
  //第二列数据
  refs["f78d0938-c545-450e-9183-d19df0c7860e"].dataChart.value = list1;
  refs["b15f6035-a900-4e08-b70e-b01110812242"].dataChart.value = list2;
  //环形图数据
  refs["ac3c4fbd-48da-4b8a-9160-9f4efa1bf1ee"].dataChart.data =
    data.CompletionRate || 0;
  refs["ac3c4fbd-48da-4b8a-9160-9f4efa1bf1ee"].dataChart.value =
    data.CompletionRate || 0;
  refs["420c81fb-ec09-44f5-8ffd-b78d2680641c"].dataChart.value =
    (data.ROUTE_STEP_NAME || 0) + "/" + (data.QUANTITY || 0);
  //表格数据
  refs["8d37b687-0d70-4a2a-979c-8519f8cbdb0c"].dataChart = tableTwoList;
  //柱状图数据
  console.log(seriesList, "==============");
  refs["afce9527-282c-48ed-850e-6859b58c8e78"].dataChart.series = seriesList;

}
