// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type VaultSharesProps = Omit<VaultShares, NonNullable<FunctionPropertyNames<VaultShares>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatVaultSharesProps = Omit<VaultSharesProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class VaultShares implements CompatEntity {

    constructor(
        
        id: string,
        vault: string,
        recipient: string,
        amount: string,
    ) {
        this.id = id;
        this.vault = vault;
        this.recipient = recipient;
        this.amount = amount;
        
    }

    public id: string;
    public vault: string;
    public recipient: string;
    public amount: string;
    

    get _name(): string {
        return 'VaultShares';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save VaultShares entity without an ID");
        await store.set('VaultShares', id.toString(), this as unknown as CompatVaultSharesProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove VaultShares entity without an ID");
        await store.remove('VaultShares', id.toString());
    }

    static async get(id: string): Promise<VaultShares | undefined> {
        assert((id !== null && id !== undefined), "Cannot get VaultShares entity without an ID");
        const record = await store.get('VaultShares', id.toString());
        if (record) {
            return this.create(record as unknown as VaultSharesProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<VaultSharesProps>[], options: GetOptions<VaultSharesProps>): Promise<VaultShares[]> {
        const records = await store.getByFields<CompatVaultSharesProps>('VaultShares', filter  as unknown as FieldsExpression<CompatVaultSharesProps>[], options as unknown as GetOptions<CompatVaultSharesProps>);
        return records.map(record => this.create(record as unknown as VaultSharesProps));
    }

    static create(record: VaultSharesProps): VaultShares {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.vault,
            record.recipient,
            record.amount,
        );
        Object.assign(entity,record);
        return entity;
    }
}
