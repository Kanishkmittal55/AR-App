#!/usr/bin/env bash
#
# Calls reusable deploy workflow

set -eo pipefail

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)

# Source utility functions
. $SCRIPT_DIR/utils.sh

usage() {
	echo "deploy.sh -v <version> -r <pipeline_ref>"
	echo "Calls the reusable deploy workflow to deploy an existing application version"
	echo
	echo "Flags:"
	echo "  -e: (Optional) Environment [default: staging]"
	echo "  -h: Prints this message"
	echo "  -r: (Optional) Workflow reference [default: main]"
	echo "  -v: Version of application to deploy"
}

ENV=${ENV:-production}
WORKFLOW_REF=${WORKFLOW_REF:-main}

WORKFLOW_FILE="reusable-deploy.yml"

while getopts "e:hr:v:" arg; do
	case $arg in
	r)
		WORKFLOW_REF=${WORKFLOW_REF}
		;;
	v)
		VERSION=$OPTARG
		;;
	*)
		usage
		exit 1
		;;
	esac
done
shift $((OPTIND - 1))

if [ -z "$VERSION" ]; then
	log_error "No 'VERSION' provided"
	log_error "Please provide a value by either passing the '-v' flag, or setting the 'VERSION' variable"

	exit 1
fi

header "Calling GHA deploy workflow"
log_info "WORKFLOW_FILE = ${WORKFLOW_FILE}"
log_info "WORKLFOW_REF  = ${WORKFLOW_REF}"
log_info "VERSION       = ${VERSION}"

REQUEST_BODY=$(jq --null-input \
	--arg workflow_ref "$WORKFLOW_REF" \
	--arg vers "$VERSION" \
	'{ "ref": $workflow_ref, "inputs": {"version": $vers}}')

curl \
	-X POST \
	-H "Accept: application/vnd.github+json" \
	-H "Authorization: Bearer ${GITHUB_TOKEN}" \
	https://api.github.com/repos/dailypay/hackathon-2023-DailyPay.Augmented/actions/workflows/${WORKFLOW_FILE}/dispatches \
	-d "${REQUEST_BODY}"
