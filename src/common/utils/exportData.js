import CsvExportor from 'csv-exportor'


// columns：表格头，格式为columns=[{title:'ID',key:'id'},{title:'名字',key:'name'}]，其中title对应表格头标题,
// key对应listData中的对象的属性
// listData：放入表格的数据，格式：listData=[{id: '111',name:'2333'}],对应到column中的key
// fileName：文件名
export function export_to_csv(columns, listData, fileName) {
    let csvHeads = []
    columns.forEach( item => {
        csvHeads.push( item.title )
    })

    
    CsvExportor.downloadCsv(
        listData,
        { header: csvHeads }, 
        fileName + '.csv'
    )
    
    
}