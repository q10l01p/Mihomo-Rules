function main(params) {
	addRejectIPRuleWithHighestPriority(params, "183.230.113.152");
	return params;
}

function addRejectIPRuleWithHighestPriority(params, ipAddress) {
	const lanRuleIndex = params.rules.findIndex(rule => rule.startsWith("GEOIP,LAN,DIRECT"));
	
	if (!params["rule-providers"]) {
		params["rule-providers"] = {};
	}
	
	const ruleSetName = "block_udp_traffic";
	
	params["rule-providers"][ruleSetName] = {
		"type": "http",
		"url": "https://raw.githubusercontent.com/yangtb2024/Steam-Clash/refs/heads/main/block_udp_traffic.yaml",
		"behavior": "classical"
	};
	
	if (lanRuleIndex !== -1) {
		params.rules.splice(lanRuleIndex + 1, 0, `IP-CIDR,${ipAddress}/32,REJECT`);
		params.rules.splice(lanRuleIndex + 2, 0, `PROCESS-NAME,ywSMPAgent.exe,REJECT`);
		params.rules.splice(lanRuleIndex + 3, 0, `PROCESS-NAME,ywSMPASvr.exe,REJECT`);
		params.rules.splice(lanRuleIndex + 4, 0, `RULE-SET,${ruleSetName},REJECT`); 
	} else {
		params.rules.unshift(`IP-CIDR,${ipAddress}/32,REJECT`);
		params.rules.unshift(`PROCESS-NAME,ywSMPAgent.exe,REJECT`);
		params.rules.unshift(`PROCESS-NAME,ywSMPASvr.exe,REJECT`);
		params.rules.unshift(`RULE-SET,${ruleSetName},REJECT`); 
	}
}
