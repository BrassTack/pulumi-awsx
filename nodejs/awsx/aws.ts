// Copyright 2016-2018, Pulumi Corporation.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// TODO[pulumi/pulumi-aws#40]: Move these to pulumi-aws.

import * as aws from "@pulumi/aws";

// Compute the availability zones only once, and store the resulting promise.
let zones: Promise<string[]> | undefined;

// Export as a function instead of a variable so clients can pass one AZ as a promise to a resource.
export async function getAvailabilityZone(index: number): Promise<string> {
    const azs = await getAvailabilityZones();
    return azs[index];
}

export function getAvailabilityZones(): Promise<string[]> {
    if (!zones) {
        zones = aws.getAvailabilityZones().then(r => r.names);
    }

    return zones;
}
