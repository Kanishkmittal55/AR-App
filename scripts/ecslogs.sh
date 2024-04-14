#!/usr/bin/env bash
#
# Tails ECS logs associated with service

set -eo pipefail

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)

# Source utility functions
. $SCRIPT_DIR/utils.sh

LOG_GROUP="daily-ar-sandbox"

header "Tailing cloudwatch logs"
log_info "LOG GROUP   = ${LOG_GROUP}"

aws logs tail \
	$LOG_GROUP \
	--follow \
	--profile "hackathon-sandbox"
