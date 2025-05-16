// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type OperatorProps = Omit<Operator, NonNullable<FunctionPropertyNames<Operator>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatOperatorProps = Omit<OperatorProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class Operator implements CompatEntity {

    constructor(
        
        id: string,
        tx: string,
        height: bigint,
        address: string,
    ) {
        this.id = id;
        this.tx = tx;
        this.height = height;
        this.address = address;
        
    }

    public id: string;
    public tx: string;
    public height: bigint;
    public address: string;
    public uri?: string;
    public name?: string;
    

    get _name(): string {
        return 'Operator';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save Operator entity without an ID");
        await store.set('Operator', id.toString(), this as unknown as CompatOperatorProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove Operator entity without an ID");
        await store.remove('Operator', id.toString());
    }

    static async get(id: string): Promise<Operator | undefined> {
        assert((id !== null && id !== undefined), "Cannot get Operator entity without an ID");
        const record = await store.get('Operator', id.toString());
        if (record) {
            return this.create(record as unknown as OperatorProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<OperatorProps>[], options: GetOptions<OperatorProps>): Promise<Operator[]> {
        const records = await store.getByFields<CompatOperatorProps>('Operator', filter  as unknown as FieldsExpression<CompatOperatorProps>[], options as unknown as GetOptions<CompatOperatorProps>);
        return records.map(record => this.create(record as unknown as OperatorProps));
    }

    static create(record: OperatorProps): Operator {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.tx,
            record.height,
            record.address,
        );
        Object.assign(entity,record);
        return entity;
    }
}
