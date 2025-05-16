import { Operator, Service } from "../types";
import { CosmosEvent } from "@subql/types-cosmos";

export async function handleMetadataUpdated({ event, tx, block }: CosmosEvent): Promise<void> {
  logger.info(`MetadataUpdated event found at ${tx.hash}`);

  let uri, name, operator, service: string | undefined;
  for (const attr of event.attributes) {
    switch (attr.key) {
      case "metadata.uri":
        uri = attr.value.toString();
        break;
      case "metadata.name":
        name = attr.value.toString();
        break;
      case "operator":
        operator = attr.value.toString();
        break;
      case "service":
        service = attr.value.toString();
        break;
      default:
        break;
    }
  }

  if (service) {
    const serviceRecord = Service.create({
      id: service,
      height: BigInt(block.block.header.height),
      tx: tx.hash,
      uri,
      name,
      address: service,
    });
    await serviceRecord.save();
  }

  if (operator) {
    const operatorRecord = Operator.create({
      id: operator,
      height: BigInt(block.block.header.height),
      tx: tx.hash,
      uri,
      name,
      address: operator,
    });
    await operatorRecord.save();
  }
}