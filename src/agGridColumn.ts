import {bindable,
    autoinject,
    inlineView,
    customElement,
    children,
    child} from 'aurelia-framework';
import {ColDef,
    SetFilterParameters,
    TextAndNumberFilterParameters,
    ICellEditor,
    ICellRendererFunc,
    ICellRenderer,
    Column,
    IFilter,
    GridApi,
    ColumnApi,
    RowNode,
    IsColumnFunc,
    IAggFunc,
    ColGroupDef
} from "ag-grid/main";

import {AgCellTemplate, AgEditorTemplate, AgFilterTemplate} from './agTemplate';

@customElement('ag-grid-column')
// <slot> is required for @children to work.  https://github.com/aurelia/templating/issues/451#issuecomment-254206622
@inlineView(`<template><slot></slot></template>`)
@autoinject()
export class AgGridColumn {
    @children('ag-grid-column')
    public childColumns:AgGridColumn[] = [];

    @child('ag-cell-template')
    public cellTemplate:AgCellTemplate;

    @child('ag-editor-template')
    public editorTemplate:AgEditorTemplate;

    @child('ag-filter-template')
    public filterTemplate:AgFilterTemplate;

    constructor(){
    }

    public hasChildColumns():boolean {
        return this.childColumns && this.childColumns.length > 0;
    }

    public toColDef():ColDef {
        let colDef:ColDef = this.createColDefFromGridColumn(this);

        if (this.hasChildColumns()) {
            (<any>colDef)["children"] = this.getChildColDefs(this.childColumns);
        }

        if (this.cellTemplate) {
            colDef.cellRendererFramework = {template: this.cellTemplate.template};
            delete (<any>colDef).cellTemplate;
        }

        if (this.editorTemplate) {
            colDef.editable = true;
            colDef.cellEditorFramework = {template: this.editorTemplate.template};
            delete (<any>colDef).editorTemplate;
        }

        if (this.filterTemplate) {
            colDef.filterFramework = {template: this.filterTemplate.template};
            delete (<any>colDef).filterTemplate;
        }

        return colDef;
    }

    private getChildColDefs(childColumns:AgGridColumn[]) {
        return childColumns
            .filter(column => !column.hasChildColumns())
            .map((column:AgGridColumn) => {
                return column.toColDef();
            });
    };

    private createColDefFromGridColumn(from:AgGridColumn):ColDef {
        let colDef:ColDef = {};
        for (var prop in this) {
            colDef[prop] = this[prop];
        }
        delete (<any>colDef).childColumns;
        return colDef;
    };

    // inputs - pretty much most of ColDef, with the exception of template, templateUrl and internal only properties
    @bindable() public colId:string;
    @bindable() public sort:string;
    @bindable() public sortedAt:number;
    @bindable() public sortingOrder:string[];
    @bindable() public field:string;
    @bindable() public headerValueGetter:string | Function;
    @bindable() public hide:boolean;
    @bindable() public pinned:boolean | string;
    @bindable() public tooltipField:string;
    @bindable() public headerTooltip:string;
    @bindable() public valueGetter:string | Function;
    @bindable() public keyCreator:Function;
    @bindable() public headerCellRenderer:Function | Object;
    @bindable() public headerCellTemplate:((params:any) => string | HTMLElement) | string | HTMLElement;
    @bindable() public width:number;
    @bindable() public minWidth:number;
    @bindable() public maxWidth:number;
    @bindable() public cellClass:string | string[] | ((cellClassParams:any) => string | string[]);
    @bindable() public cellStyle:{} | ((params:any) => {});
    @bindable() public cellRenderer:{
        new (): ICellRenderer;
    } | ICellRendererFunc | string;
    @bindable() public cellRendererFramework:any;
    @bindable() public cellRendererParams:{};
    @bindable() public cellEditor:{
        new (): ICellEditor;
    } | string;
    @bindable() public cellEditorFramework:any;
    @bindable() public cellEditorParams:{};
    @bindable() public floatingCellRenderer:{
        new (): ICellRenderer;
    } | ICellRendererFunc | string;
    @bindable() public floatingCellRendererFramework:any;
    @bindable() public floatingCellRendererParams:{};
    @bindable() public cellFormatter:(params:any) => string;
    @bindable() public floatingCellFormatter:(params:any) => string;
    @bindable() public aggFunc:string | IAggFunc;
    @bindable() public rowGroupIndex:number;
    @bindable() public pivotIndex:number;
    @bindable() public comparator:(valueA:any, valueB:any, nodeA:RowNode, nodeB:RowNode, isInverted:boolean) => number;
    @bindable() public checkboxSelection:boolean | (Function);
    @bindable() public suppressMenu:boolean;
    @bindable() public suppressSorting:boolean;
    @bindable() public suppressMovable:boolean;
    @bindable() public suppressFilter:boolean;
    @bindable() public unSortIcon:boolean;
    @bindable() public suppressSizeToFit:boolean;
    @bindable() public suppressResize:boolean;
    @bindable() public suppressAutoSize:boolean;
    @bindable() public enableRowGroup:boolean;
    @bindable() public enablePivot:boolean;
    @bindable() public enableValue:boolean;
    @bindable() public editable:boolean | IsColumnFunc;
    @bindable() public suppressNavigable:boolean | IsColumnFunc;
    @bindable() public newValueHandler:Function;
    @bindable() public volatile:boolean;
    @bindable() public filter:string | {
        new (): IFilter;
    };
    @bindable() public filterFramework:any;
    @bindable() public filterParams:SetFilterParameters | TextAndNumberFilterParameters;
    @bindable() public cellClassRules:{
        [cssClassName: string]: (Function | string);
    };
    @bindable() public onCellValueChanged:Function;
    @bindable() public onCellClicked:Function;
    @bindable() public onCellDoubleClicked:Function;
    @bindable() public onCellContextMenu:Function;
    @bindable() public icons:{
        [key: string]: string;
    };
    @bindable() public enableCellChangeFlash:boolean;

    @bindable() public headerName: string;
    @bindable() public columnGroupShow: string;
    @bindable() public headerClass: string | string[] | ((params: any) => string | string[]);
    @bindable() public children: (ColDef | ColGroupDef)[];
    @bindable() public groupId: string;
    @bindable() public openByDefault: boolean;
    @bindable() public marryChildren: boolean;

}