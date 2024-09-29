#!/bin/bash

# Path to your SSH key
KEY_TO_SSH_REMOTE_EC2="/home/ubuntu/environment/eddieweekend.pem"

# AWS EC2 instance details
image_id="ami-04a8190f5e58c8529"
instance_type="t2.micro"
key_name="eddieGaisie_28_sep_24_ssh"
security_groups="launch-wizard-5"

# Launch a new EC2 instance
EC2_ID=$(aws ec2 run-instances \
--image-id $image_id \
--instance-type $instance_type \
--key-name $key_name \
--security-groups $security_groups \
--tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=$1-$EPOCHSECONDS-$$}]" | jq -r '.Instances[0].InstanceId')

# Wait until the instance is in the running state to retrieve the public IP
aws ec2 wait instance-running --instance-ids "$EC2_ID"

# Retrieve the public IP address of the EC2 instance
EC2_PUBLIC_IP=$(aws ec2 describe-instances --instance-ids $EC2_ID | jq -r '.Reservations[0].Instances[].PublicIpAddress')

echo "Instance ID: $EC2_ID"
echo "Public IP: $EC2_PUBLIC_IP"

sleep 60
# Connect to the EC2 instance via SSH and run commands
ssh -i "$KEY_TO_SSH_REMOTE_EC2" -o StrictHostKeyChecking=no "ubuntu@$EC2_PUBLIC_IP" << EOF
    echo "Connected to EC2 Instance $EC2_ID"
    uptime
    df -h
    free -m
    # Add more commands as needed
EOF
