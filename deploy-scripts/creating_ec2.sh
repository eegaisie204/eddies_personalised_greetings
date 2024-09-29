#!/bin/bash

IMA="ami-04a81a99f5ec58529"
Instance_type="t2.micro"
keys="eddieweekend"
sec_group="launch-wizard-5"

for i in "$@"
do
aws ec2 run-instances \
	--image-id $IMA \
	--instance-type $Instance_type \
	--key-name $keys \
	--security-groups $sec_group \
	--tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=$i}]"
done


